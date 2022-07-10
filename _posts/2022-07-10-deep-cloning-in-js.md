---
layout: post
title: Deep Cloning in JS
date: 2022-07-10 20:16
---
### Flawed version

```js
const obj = {
  str: 'string',
  num: 0,
  obj: {},
  arr: [],
  nul: null,
  bool: false,
  inf: Infinity,
  und: undefined,
  fn: (a, b) => a + b,
  date: new Date(),
  reg: /\w/g
};

const arr = [
  'string',
  0,
  {},
  [],
  null,
  false,
  Infinity,
  undefined,
  (a, b) => a + b,
  new Date(),
  /\w/g
];

const objCopy = JSON.parse(JSON.stringify(obj));
const arrCopy = JSON.parse(JSON.stringify(arr));

console.log(objCopy);
console.log(arrCopy);


/*
JSON.parse(JSON.stringify(object)) could suffer data loss due to the limitation of supported data types, which are:
object, array, string, number, boolean, and null

{
  str: 'string',
  num: 0,
  obj: {},
  arr: [],
  nul: null,
  bool: false,
  inf: null,
  date: '2022-07-10T12:02:13.720Z',
  reg: {}
}

[
  'string',
  0,
  {},
  [],
  null,
  false,
  null,
  null,
  null,
  '2022-07-10T12:02:13.720Z',
  {}
]
*/
```

### Proper method

```js
function deepCopy (src) {
  if (src === null || typeof src !== 'object') return src;

  if (src instanceof Date) {
    return new Date(src);
  }

  if (src instanceof Array) {
    const copy = [];
    for (let i = 0; i < src.length; i++) {
      copy[i] = deepCopy(src[i]);
    }
    return copy;
  }

  if (src instanceof Object) {
    const copy = {};
    for (const attr in src ) {
      if (Object.prototype.hasOwnProperty.call(src, attr)) {
        copy[attr] = deepCopy(src[attr]);
      }
    }
    return copy;
  }

  return src;
}
```

### Further Readings

- [What is the most efficient way to deep clone an object in JavaScript?](https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript)