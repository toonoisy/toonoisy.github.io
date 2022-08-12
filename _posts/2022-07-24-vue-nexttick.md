---
layout: post
title: 理解 Vue.nextTick
date: 2022-07-24 12:16 
categories: vue
---

## 一些基本概念

### Event Loop

说 `Vue.nextTick` 之前，首先要<a href="./js-event-loop.html">理解 JS 事件循环机制</a>，它是 JS 程序的消息派发机制，负责在主线程调用栈闲置时，从任务队列中取出最早的任务加入调用栈中，等到该任务执行完毕，就算完成了一轮事件循环，也叫走完一个 "tick"。

任务队列中的任务又被叫做“宏任务”，主线程执行任务时，往往还会生成一些“微任务”，当前任务处理完毕后，要将现存的微任务也一并清空，此时浏览器才有机会执行页面渲染。

### Visual DOM

所谓虚拟 DOM 是一个用来映射真实 DOM 节点信息的 JS 对象，其体积比真实 DOM 要小，操作它的效率和性能成本也更低。Vue 使用虚拟 DOM 来追踪自己将要对真实 DOM 进行的修改，在浏览器重新渲染页面之前将这些修改一次性 patch 到真实 DOM 上。

### Vue 的响应式系统

简而言之，Vue 使用 `Object.defineProperty` 为所有在 `data` 选项中声明的属性递归添加 getter/setter，读取数据触发 getter 时，该数据的发布者 `dep` 会将对应的组件 `watcher` 添加为订阅者，修改数据触发 setter 时，也是由 `dep` 通知所有订阅的 `watcher` 重新渲染视图。

## Vue 的异步更新队列

### 异步派发更新

Vue 的响应式系统实现了数据变化触发视图更新，但这些数据变化并不是实时反映在 DOM 上。

每一轮事件循环执行时，Vue 会将该轮循环中触发的所有 `watcher`  **去重**保存在一个异步更新队列中，这样做能够避免不必要的计算和 DOM 操作，同一数据修改多次，最终也只会执行最后一次修改的结果。

我们来看一些关键的源码（**均来自 2.6 版本**）：

首先是 [watcher.js](https://github.com/vuejs/vue/blob/65a333fcb43737c73a66a088cea17361963e5f66/src/core/observer/watcher.js#L165) 部分，在普通场景下，数据更新，`watcher` 身上的 `update`  方法被触发，会进入 `queueWatcher` 方法，开始处理异步更新队列的逻辑。

```js
update () {
  if (this.lazy) { // lazy 标识是否为计算属性
    this.dirty = true
  } else if (this.sync) { // sync 标识是否需要同步更新
    this.run()
  } else {
    queueWatcher(this) // 进入异步更新队列
  }
}
```

`queueWatcher` 定义在 [scheduler.js](https://github.com/vuejs/vue/blob/65a333fcb43737c73a66a088cea17361963e5f66/src/core/observer/scheduler.js#L164)，它通过传入的 `watcher` 身上的 id 判断其是否已存在队列中，避免加入重复的 `watcher` 。

维护好队列之后就要考虑如何异步执行了，这时候就轮到 `nextTick` 登场。我们可以看到 `queueWatcher`  结束的时候调用了 `nextTick`  并传入刷新队列的方法 `flushSchedulerQueue` 。

```js
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  // 已有 watcher 不会被重复推入队列
  if (has[id] == null) {
    has[id] = true
    if (!flushing) { // flushing 标识是否正在刷新队列
      queue.push(watcher) // 将非既有的 watcher 加入队列
    } else {
      // 如果队列正在刷新，要将 watcher 按 id 大小插入正确的索引位置
      // 如果该索引已经过了，队列已经处理到更靠后的 id，则让其接下来立即执行
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    if (!waiting) { // waiting 标识是否在等待刷新
      waiting = true

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue()
        return
      }
      nextTick(flushSchedulerQueue) // 调用 nextTick 并传入刷新队列的方法
    }
  }
}
```

进入 `nextTick`  之前我们最后看一下 `flushSchedulerQueue`，也就是刷新 `watcher` 队列，触发 `watcher` 更新的方法，它同样定义在 [scheduler.js](https://github.com/vuejs/vue/blob/65a333fcb43737c73a66a088cea17361963e5f66/src/core/observer/scheduler.js#L71)。

 `flushSchedulerQueue` 将队列中的 watcher 按 id 由小到大进行了排序，这样做是为了确保：

1. 父组件先于子组件更新，因为父组件比子组件先创建
2. `user watcher` （即用户定义的 watcher）要先于 `render watcher` 执行，因为 `user watcher` 比  `render watcher`  先创建
3. 如果子组件在父组件更新时被销毁，该子组件的 `watcher` 跳过不执行

```js
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow()
  flushing = true
  let watcher, id

  queue.sort((a, b) => a.id - b.id) // 按 id 大小升序排列

  // 不要缓存 queue.length
  // 因为处理现有 watcher 时可能会有更多 watcher 加入进来
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before()
    }
    id = watcher.id
    has[id] = null
    watcher.run() // 真正做 watcher 更新操作

    // dev 环境检查死循环
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? `in watcher with expression "${watcher.expression}"`
              : `in a component render function.`
          ),
          watcher.vm
        )
        break
      }
    }
  }

  // 清空队列前保存副本
  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()

  // 该函数会清空队列并重置 waiting 和 flushing 标识
  resetSchedulerState()

  // 调用组件 updated 和 activated 钩子
  callActivatedHooks(activatedQueue)
  callUpdatedHooks(updatedQueue)

  // devtool 钩子
  if (devtools && config.devtools) {
    devtools.emit('flush')
  }
}
```

### nextTick 核心工作原理

`nextTick` 是如何工作的？我们先看 [next-tick.js](https://github.com/vuejs/vue/blob/2.6/src/core/util/next-tick.js) 中对外暴露的主函数。

 `nextTick` 内部维护了一个 `callbacks` 队列，用来存储同一轮事件循环中传入的回调，但它真正实现异步是调用了 `timerFunc` 方法。

```js
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  // 将传入的回调推入回调队列
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) { // pending 标识 timerFunc 是否已经调用
    pending = true
    timerFunc()
  }
  // 如果不传参调用，则返回一个 Promise 对象
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

`timerFunc`  是如何做到异步的？

答案是使用 `Promise.then` 或 `MutationObserver` 创建微任务。这使 Vue 的虚拟 DOM 更新和真实 DOM 转换工作能在页面重新渲染之前完成。

而在有兼容性问题的环境中，会被降级成使用定时器。不论是  `setImmediate` 还是 `setTimeout(fn, 0)` ，本质都是宏任务，需要等待当前事件循环结束后才有机会被执行，由此可能会导致一些不符合预期的页面渲染问题。

```js
let timerFunc // 用来实现异步的函数，使传入的 flushCallbacks 延迟运行

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  // 方案一，首选原生 Promise.then 创建微任务
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // 处理 iOS >= 9.3.3 环境下 Promise.then 存在的 bug
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // 方案二，不支持原生 Promise 时使用 MutationObserver 创建微任务
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // 方案三，使用 setImmediate 创建宏任务
  // 下一轮事件循环即可执行，无需在任务队列中排队等候
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // 方案四，使用 setTimeout(fn, 0) 创建宏任务
  // 本轮事件循环结束后，仍需在任务队列中排队等候，按顺序执行
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

最后看一下 `timerFunc` 中传入的 `flushCallbacks` 方法，也就是遍历执行回调，并将 `callbacks` 队列清空。

```js
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0) // 清空队列前保存当前副本
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```

## nextTick 的作用

经过之前的分析我们得知，nextTick 的作用是创建异步任务（优先使用微任务，降级使用宏任务），使代码能够延迟运行。Vue 内部做 DOM 更新操作，也是调用它来实现异步更新。

nextTick 内部维护了一个队列， 用来存放等待执行的回调，当我们在组件中修改了数据，并且想基于更新后的 DOM 做一些操作时，可以使用 nextTick。此举本质是**向更新 DOM 的回调之后追加新回调**，所以能够保证我们的代码执行时，最近一次 DOM 更新已经完成。

### 生命周期钩子中使用 nextTick

>注意 `mounted` **不会**保证所有的子组件也都被挂载完成。如果你希望等到整个视图都渲染完毕再执行某些操作，可以在 `mounted` 内部使用 [vm.$nextTick](https://cn.vuejs.org/v2/api/index.html#vm-nextTick)。

## nextTick 的用法

Vue 提供了一个全局的 `Vue.nextTick` 方法，同时也可以在组件实例上直接通过 `this.$nextTick`  来调用，传入其内部的回调会被延迟到最近一次 DOM 更新完毕后执行。

如果不传参调用，它将返回一个 `Promise` 对象，所以还可以 `then` 调用，或结合 `async/await` 语法使用它。

```js
methods: {
  fn1 () {
    this.a = 1;
    this.$nextTick(() => {
      // do sth
    });
  },
  /* or */
  fn2 () {
    this.a = 1;
    this.$nextTick().then(() => { 
      // do sth
    })
  },
  /* or */
  async fn3 () {
    this.a = 1;
    await this.$nextTick();
    // do sth
  }
}
```

## References

- [Async Update Queue](https://v2.vuejs.org/v2/guide/reactivity.html#Async-Update-Queue)
- [Lifecycle Hooks - mounted](https://v2.vuejs.org/v2/api/#mounted)
- [What is nextTick and what does it do in Vue.js?](https://stackoverflow.com/a/47636157)
- [纯干货！你不知道的Vue.nextTick](https://juejin.cn/post/7077181211029798942)
