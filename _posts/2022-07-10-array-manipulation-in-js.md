---
layout: post
title: Array Manipulation in JS
date: 2022-07-10 19:54
---

### Create an [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) object with certain length (of empty slots)

```js
// call Array as a constructor
new Array(3)
// or simply call it as a function
Array(3)
```

### Fill Array elements with certain value

```js
// fill(value, incluStart, excluEnd)
Array(3).fill(0) // [0, 0, 0]
[0, 0, 0].fill(1, 0, 2) // [1, 1, 0]
[0, 0, 0].fill(1, -3, -1) // [1, 1, 0]
```

### Add, remove, or replace Array elements

```js
const a = [1, 2, 3]

// add one to the end
a.push(4) // 4
console.log(a) // [1, 2, 3, 4]

// add one to the beginning
a.unshift(0) // 0
console.log(a) // [0, 1, 2, 3, 4]

// remove the last one
a.pop() // 4
console.log(a) // [0, 1, 2, 3]

// remove the first one
a.shift() // 0
console.log(a) // [1, 2, 3]

// remove the first one
a.splice(0, 1) // [1]
console.log(a) // [2, 3]

// replace index 0 with a 5
a.splice(0, 1, 5) // [2]
console.log(a) // [5, 3]

// insert a 6 at index 0
a.splice(0, 0, 6) // []
console.log(a) // [6, 5, 3]
```

### Access to part of the Array without modifying it

```js
const a = [1, 2, 3]

// remove the first one
a.slice(1) // [2, 3]

// remove the last one
a.slice(0, -1) // [1, 2]

// insert a 0 at index 1
[...a.slice(0, 1), 0, ...a.slice(1)] // [1, 0, 2, 3]

// replace index 1 with a 0
[...a.slice(0, 1), 0, ...a.slice(2)] // [1, 0, 3]

console.log(a) // [1, 2, 3]
```

### Get a shallow copy

```js
const a = [{ key: 0, value: [0] }, { key: 1, value: [1] }]
let copy

copy = a.slice()
copy = a.map(e => e)
copy = Array.from(a)
copy = Object.assign([], a)
copy = [...a]
copy = [].concat(a)

// modify a shallow copy can affect the original
copy[0].key = 2
console.log(a[0].key) // 2
```

### Further Readings

- [50 Essential Array Manipulation Methods for JS Devs (2022)](https://javascript.plainenglish.io/50-essential-array-methods-for-js-devs-2022-b3bfbbb7013e)