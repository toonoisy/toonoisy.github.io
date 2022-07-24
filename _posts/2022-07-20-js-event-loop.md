---
layout: post
title: 理解 JS 事件循环机制
date: 2022-07-20 01:07
categories: [js, browser]
---

## 概述

JavaScript 是一门单线程脚本语言，它的设计初衷仅仅是为了实现用户与网页交互。单线程意味着它在运行时只有一个调用栈，所以一次只能做一件事情。同时 JS 又是非阻塞的，它通过事件回调等方式处理异步代码。

事件循环是 JS 程序的消息派发机制，可以用来协调事件、用户交互、脚本、渲染、网络等等。JS 实现异步操作就是建立在使用事件循环的基础上。

## 任务队列

JS 引擎工作时，除了创建单一的内存堆 (Memory Heap) 和调用栈 (Call Stack)，还会开启一个或多个任务队列 (Task Queue) ，用来存储等待执行的异步回调。

## 什么时候加入任务队列

JS 引擎运行代码的原则是，遇到同步代码直接执行，碰到异步任务则移交给对应的 [Web API](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction) 处理，自己接着运行后面的代码。这些由浏览器提供的 Web API 会在正确的时机 (例如 DOM 事件被触发，定时器到期) 将任务回调依次加入任务队列中。

## 什么时候读取任务队列

等到主线程调用栈清空的时候，事件循环就开始发挥作用。

此时如果任务队列不为空，将按照先进先出原则 (First in, first out)，最早加入队列的回调会被取出加入到调用栈中执行。没有任务时引擎会进入休眠状态，直到新的任务出现，如此反复。

## 宏任务与微任务

事件循环的运作还涉及到一个重要的细节，即区别对待宏任务和微任务。

### 宏任务 

宏任务就是我们之前一直说的 "Task"，它的目标是完成一项特定的事务。常见的宏任务包括：定时器，鼠标/键盘事件，网络事件，HTML 解析等。

每轮事件循环有且只有一个正在运行的任务，其余都在任务队列中等候。

### 微任务

微任务在 ECMAScript 中被叫做 "Job"，是***优先级更高的异步操作***。`Promise` 和 `MutationObserver` 的回调都属于微任务。

每轮事件循环都有自己的微任务队列，用来存储当前任务执行过程中生成的等待执行的微任务。由于微任务优先级大于宏任务，永远要等现存的微任务全部执行完毕后才能进入下一轮循环。

### 延伸问题：定时器的延迟时间

以 `setTimeout()` 为例，我们都知道它的第二个参数是以毫秒为单位设置定时器的 (最短) 延迟时间，然而 `setTimeout(code, 0)` 并不会让代码立即执行。

这是因为定时器作为一个异步宏任务，要等待自己的回调被事件循环取出后才会被执行，所以实际的延迟时间往往需要叠加它在任务队列中排队等待的时间。

## 什么时候更新 UI

页面渲染只发生在新一轮事件循环开始前，即本轮宏任务和其生成的全部微任务执行完毕后。这样一来每次都能获得最符合当前预期的渲染结果，最大程度保证渲染效率。

但如果任务迟迟没有执行完毕，页面就会被挂起。所以出现页面无法响应的时候，说明有存在大量计算行为的代码阻塞了事件循环。

## 输出示例

```js
setTimeout( () => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then( () => {
  console.log(3)
})

Promise.resolve(5).then(() => console.log(5))

console.log(2)
```

选中文字查看答案：<span style="color: #fff">1, 2, 3, 5, 4<span>

## References

- [What the heck is the event loop anyway? \| Philip Roberts \| JSConf EU](https://youtube.com/watch?v=8aGhZQkoFbQ)
- [HTML Standard - 8.1.6 Event loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)
- [The event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [Event loop: microtasks and macrotasks](https://javascript.info/event-loop)
- [Difference between microtask and macrotask within an event loop context](https://stackoverflow.com/a/70883212)
- [彻底搞懂JavaScript事件循环](https://juejin.cn/post/6992167223523541023)

## Further Readings

- [How JavaScript works: an overview of the engine, the runtime, and the call stack](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
- [How JavaScript works: inside the V8 engine + 5 tips on how to write optimized code](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)