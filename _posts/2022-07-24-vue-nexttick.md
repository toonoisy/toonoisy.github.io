---
layout: post
title: 理解 Vue.nextTick
date: 2022-07-24 12:16 
categories: vue
---

## 一些基本概念

### Event Loop

说 `Vue.nextTick` 之前，首先要<a href="./js-event-loop.html">理解 JS 事件循环机制</a>，它是 JS 程序的消息派发机制，一轮事件循环就是一个 “tick”。

### Visual DOM

所谓虚拟 DOM 是一个用来映射真实 DOM 节点信息的 JS 对象，其体积比真实 DOM 要小，操作它的效率和性能成本也更低。Vue 使用虚拟 DOM 来追踪自己将要对真实 DOM 进行的修改，在浏览器重新渲染页面之前再转换成真实的 DOM。

## Vue 的异步更新队列

### 异步更新 DOM

Vue 的一大特点是数据驱动，修改组件数据会触发视图更新。但这些数据变化并不会实时反映在 DOM上。

> 可能你还没有注意到，Vue 在更新 DOM 时是**异步**执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。

每一轮事件循环执行时，Vue 会将当前循环中触发的所有 watcher **去重**保存在一个异步更新队列中，而不是实时地处理这些更新，同一数据修改多次，也只会执行最后一次修改的结果。

### 内部实现

那这种异步 DOM 更新又是怎样实现的呢？

> Vue 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。

答案是使用 `Promise.then` 或 `MutationObserver` 向当前事件循环生成的微任务队列队尾追加微任务，使其能在页面重新渲染之前完成虚拟 DOM 的更新，然后再一次性 patch 到真实 DOM 上。

而在有兼容性问题的环境中，会被降级成使用定时器。不论是  `setImmediate` 还是 `setTimeout(fn, 0)` ，本质都是宏任务，需要等待当前事件循环结束后才有机会被执行，由此可能会导致一些不符合预期的页面渲染问题。

阅读源码我们就会发现，以上正是 [nextTick](https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js) 的实现原理，Vue 自身实现异步更新 DOM也是[借助了 nextTick](https://github.com/vuejs/vue/blob/8d3fce029f20a73d5d0b1ff10cbf6fa73c989e62/src/core/observer/scheduler.js#L187)。

## nextTick 的作用

经过之前的分析我们得知，nextTick 的作用是延迟代码运行，Vue 内部做 DOM 异步更新操作时也会调用它。

当我们在组件中修改了数据，并且想基于更新后的 DOM 做一些操作时，可以使用 nextTick，此举本质是创建一个微任务，并追加到更新 DOM 的微任务之后，所以能够保证我们的代码在最近一次 DOM 更新完成后运行。

### 生命周期钩子中使用 nextTick

生命周期 `mounted` 函数被触发时，组件已经挂载完毕，此时就可以获取到真实 DOM 元素了。但 `mounted` 不保证其所有子组件也都挂载完毕，如果想要确保整个视图更新完毕后再执行一些操作，可以在 `mounted` 内部使用 `nextTick`。

## nextTick 的用法

Vue 提供了一个全局的 `Vue.nextTick()` 方法，同时也可以在组件实例上直接通过 `this.$nextTick()`  来调用，传入其内部的回调会被延迟到最近一次 DOM 更新完毕后执行。如果不传参调用，它将返回一个指示 DOM 是否更新完成的 `Promise` 对象，所以还可以结合 `async/await` 语法使用它。

```js
methods: {
  fn1 () {
    this.a = 1;
    this.$nextTick(() => {
      // do sth
    });
  },
  /* or */
  async fn2 () {
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
- [Vue源码详解之nextTick：MutationObserver只是浮云，microtask才是核心！](https://segmentfault.com/a/1190000008589736)
