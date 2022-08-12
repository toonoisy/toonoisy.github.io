---
layout: post
title: 理解 JS 中的 this 关键字
date: 2022-06-17 00:23
categories: js
---

## 什么是 this

在 JavaScript 中，用 `this` 关键字来指代当前代码的运行环境（execution context），它的值通常是一个对象。全局环境的 `this` 指向一个全局对象，在浏览器中即 `Window`，node 中是 `Global`。

### 普通函数调用和对象方法调用

如下示例可以看出：

- 普通函数在全局环境中执行时，其 `this` 自然是指向 `Window`
- 函数作为对象方法调用时，是从调用它的对象内部运行，其 `this` 指向该对象

```js
a = 1;
const obj = {
  a: 2,
  fn () {
    console.log(this.a);
  }
}
const fn = obj.fn;

fn(); // 输出 1，this 指向 Window
obj.fn(); // 输出 2，this 指向 obj
```

### 构造函数 new 关键字调用

当我们使用 [`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) 关键字调用一个函数时，`new` 关键字视此函数为一个 "constructor"，它做的工作有如下几步：

- 创建一个空的 JS 对象
- 将此对象的 `__proto__` 属性指向其构造函数的 `prototype` 属性
- 运行该构造函数内的代码，并将运行时的 `this` 指向刚才创建的对象
- 如果该构造函数有显式返回值，且该值是引用数据类型，那么该值就是整个 `new` 表达式的返回结果，否则 `new` 表达式会返回之前创建的对象

```js
function MacBook (year, color) {
  // this = {}; 隐式创建一个空对象，并将运行 this 指向它
  this.year = year;
  this.color = color;
  return [1,2,3]; // 真实开发中没人会显式返回一个值，合理的情况是任其隐式 return this
  console.log(this);
}
const myMacBook = new MacBook(2021, 'silver'); // 输出 {year: 2021, color: 'silver'}

console.log(myMacBook); // 输出 [1,2,3]
```

### 全局的定时器方法

`setInterval()` 和 `setTimeout()` 是全局对象 `Window` 上的方法，它们内部的运行 `this` 是什么不用说了吧。

### DOM 事件处理程序

如下示例可以看出:

- 在 DOM 事件处理程序中，`this` 指向绑定事件的元素
- 值得注意的是，在行内绑定的事件中，绑定事件的元素能够作为 `this` 传参给事件函数，但与事件函数本身的 `this` 不能混为一谈

```html
<body onload="bindClicks()">
  <!-- true -->
  <button onclick="console.log(this === event.currentTarget)">btn1</button>

  <button onclick="clickBtn2(this, event)">btn2</button>
  <button id="btn3">btn3</button>
  <button id="btn4">btn4</button>
</body>

<script>
  // 测试行内绑定
  function clickBtn2 (ele, event) {
    console.log(ele === event.currentTarget); // true
    console.log(ele.innerText); // 输出 btn2
    console.log(this); // 输出 Window
  };
  // 测试动态绑定
  function clickBtn3 () {
    document.getElementById('btn3').onclick = function (event) {
      console.log(this === event.currentTarget); // true
    };
  }
  // 测试事件监听
  function clickBtn4 () {
    document.getElementById('btn4').addEventListener('click', function (event) {
      console.log(this === event.currentTarget); // true
    });
  }
  function bindClicks () {
    clickBtn3();
    clickBtn4();
  }
</script>
```

### 箭头函数

ES6 中引入的[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，语法上较传统函数表达式更为简单，特点是没有自己的 `this`，`arguments`，`super`，`prototype` 等，也不能被当作构造函数使用。

箭头函数的 `this` 继承自其外部作用域（the enclosing lexical context）。

```js
a = 1;
const obj = {
  a: 2,
  Fn: () => {
    console.log(this.a);
  }
};
const fn = obj.Fn;
const f = new Fn(); // Uncaught TypeError: f is not a constructor

fn(); // 输出 1，this 指向 Window
obj.Fn(); // 输出 1，其 this 与 obj 的 this 一致，指向 Window
```

## 如何改变函数的 this

### Function.prototype.call()

此方法使用指定的 `this` 来调用函数。

可接受多个入参，第一个参数为该函数运行时使用的 `this`，后可伴随一个或多个该函数的指定参数。

### Function.prototype.apply()

此方法使用指定的 `this` 来调用函数。

可接受两个入参，第一个参数为该函数运行时使用的 `this`，第二个参数为一个数组或类数组对象，用来传入一个或多个该函数的指定参数。

### Function.prototype.bind()

此方法生成一个使用指定的 `this` 的新函数。

可接受多个入参，第一个参数为新函数运行时使用的 `this`，后可伴随一个或多个原函数的指定参数。

新函数不会主动运行，需要手动调用。

```js
a = 1;
const obj = {
  a: 2,
  fn (b, c) {
    console.log(this.a + b + c);
  }
}
const fn = obj.fn;

fn(1, 2); // 输出 4
obj.fn(1, 2); //输出 5
obj.fn.call(this, 1, 2); // 输出 4
obj.fn.apply(this, [1, 2]); // 输出 4

const fn2 = obj.fn.bind(this, 1, 2);
fn2(); // 输出 4
```

## 严格模式

ES5 中引入的严格模式会改变一些代码的运行结果，例如：

- 在全局环境中 `this` 不再指向 `Window`，而是指向 `undefined`
- 使用函数的 `call()`、`apply()`、`bind()` 方法时，如果指定 `this` 为 `null` 或 `undefined`（或不传参），普通模式下会被替换成 `Window`，而严格模式将不再替换
- 也就是说，this 在非严格模式下总是指向一个对象，严格模式下则可能是任何值

使用 babel 将 ES6 代码编译成 ES5 时，默认会使用严格模式。

## Vue.js

Vue.js 中的 `this` 在符合预期的场景中指向调用它的 Vue 实例。由于 Vue 实例也代理了`methods`、`data`、`watch`、`props` 和 `computed` 中的属性和方法，使得我们能够通过 `this` 直接访问这些数据。

什么是不符合预期的场景呢？

- 在 `computed` 中使用箭头函数定义计算属性时，Vue 实例是作为函数的第一个参数提供的，但如果直接使用 `this` 则会指向 `undefined`
- 在 `methods` 中使用箭头函数定义方法时，其 `this` 会指向 `undefined`
- 将任何生命周期函数书写成箭头函数时，它们的 `this` 会指向 `undefined`

## References

- [JavaScript 的 this 原理](https://www.ruanyifeng.com/blog/2018/06/javascript-this.html)
- [Constructor, operator "new"](https://javascript.info/constructor-new)
- [事件处理中的this：attachEvent, addEventListener, onclick](https://harttle.land/2015/08/14/event-and-this.html)
- [为什么 Vue2 this 能够直接获取到 data 和 methods](https://chinese.freecodecamp.org/news/why-this-in-vue2-can-get-data-and-methods-directly)
-  [no-prototype-builtins](https://eslint.org/docs/rules/no-prototype-builtins)
