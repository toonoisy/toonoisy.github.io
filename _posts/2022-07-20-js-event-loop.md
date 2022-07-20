---
layout: post
title: 理解 JS 事件循环机制
date: 2022-07-20 01:07
categories: js
---

## 概述

JavaScript 是一门单线程脚本语言，它的设计初衷仅仅是为了实现用户与网页交互。单线程意味着它在运行时只有一个调用栈，所以一次只能做一件事情。同时 JS 又是非阻塞的，它通过事件回调等方式处理异步操作。

事件循环 (Event Loop) 就是 JS 引擎执行异步代码的机制，指 JS 引擎在主线程闲置时，从任务队列中取出任务回调，将其加入调用栈中的循环过程。

## 任务队列

JS 引擎工作时，除了创建单一的内存堆 (Memory Heap) 和调用栈 (Call Stack)，还会开启任务队列 (Task Queue，或被叫做 Callback Queue) ，用来存储等待执行的异步回调。

### 什么时候加入任务队列

JS 引擎运行代码的原则是，遇到同步代码直接执行，碰到异步任务则移交给对应的 [Web API](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction) 处理，自己接着运行后面的代码。这些由浏览器提供的 Web API 会在正确的时机 (例如 DOM 事件被触发，定时器到期) 将任务回调依次加入任务队列中。

### 什么时候读取任务队列

等到主线程调用栈清空的时候，事件循环就开始发挥作用。

此时如果任务队列不为空，将遵循先进先出原则 (First in, first out)，最早加入队列的回调会被取出加入到调用栈中执行。没有任务时引擎会进入休眠状态，直到新的任务出现，如此反复。

## 宏任务与微任务

事件循环的运作还涉及到一个重要的细节，即区别对待宏任务和微任务。

### 宏任务 

- 宏任务就是我们之前一直说的 "Task"，目标是完成一项特定的功能，例如鼠标/键盘事件，定时器等。程序开启执行本身也是一个宏任务。
- 一轮循环只执行一个宏任务，其余都在队列中等候。

### 微任务

- 微任务在 ECMAScript 中被叫做 "Job"，是***优先级更高的异步操作***。`Promise` 和 `MutationObserver` 的回调都属于微任务。
- 由于微任务优先级大于宏任务，宏任务永远要等现存的微任务全部执行完毕后才开始执行。当一个宏任务执行完毕后，要将产生的所有微任务依次***清空***，当前循环才算结束。

### 延伸问题：定时器的延迟时间

以 `setTimeout()` 为例，我们都知道它的第二个参数是以毫秒为单位设置定时器的 (最短) 延迟时间，然而 `setTimeout(code, 0)` 并不会让代码立即执行。

这是因为定时器作为一个异步宏任务，要等待自己的回调被事件循环取出后才会被执行，如果它不是最早被加入任务队列的任务，它的延迟还要叠加更多在队列中等待的时间。

## 什么时候渲染 DOM

一轮事件循环也叫一个 "tick"，DOM 渲染只发生在每个 tick 间隙，这样一来每次都能获得最符合当前预期的渲染结果，最大程度保证渲染效率。但如果任务迟迟没有执行完毕，页面就会无法响应。

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
- [The event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [Event loop: microtasks and macrotasks](https://javascript.info/event-loop)
- [Difference between microtask and macrotask within an event loop context](https://stackoverflow.com/a/70883212)
- [Event Loop Processing Model](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)
- [彻底搞懂JavaScript事件循环](https://juejin.cn/post/6992167223523541023)

## Further Readings

- [How JavaScript works: an overview of the engine, the runtime, and the call stack](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
- [How JavaScript works: inside the V8 engine + 5 tips on how to write optimized code](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)