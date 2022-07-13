---
layout: post
title: Pass Values Between HTML, JS, and CSS
date: 2022-07-13 00:42
categories: web_dev
---

## Usage of HTML Dataset

### Do
```css
/* <div data-tip="this is a tip for you" /> */
[data-tip]::before {
  content: attr(data-tip);
}
```

```js
/* <button data-tip="this is a tip for you" /> */
const el = document.querySelector('[data-tip]');
const { tip } = el.dataset; // get
el.dataset.tip = 'set a new tip'; // set
```

### Don't

```css
/* <div data-bgc="yellow" /> */
[data-tip] {
  /* won't work */
  background: attr(data-bgc);
}
```

## CSS Variable Manipulation with JS

```css
:root {
  --bgc: red;
}
div {
  background: var(--bgc);
}
```

```js
const oBgc = document.documentElement.style.getPropertyValue('--bgc'); // get
document.documentElement.style.setProperty('--bgc', 'yellow'); // set
```

## Inline Styles Binding in Vue

### Template string

```vue
<template>
  <div :style="`background:${bgc};width:${w}px;`" />
</template>

<script>
export default {
  data () {
    return {
      bgc: '#333',
      w: 10
    };
  }
};
</script>
```

### Style object

```vue
<template>
  <div :style="styleObject" />
</template>

<script>
export default {
  data () {
    return {
      styleObject: {
      	background: '#333',
      	width: '10px'
      }
    };
  }
};
</script>
```

### Multiple style objects

```vue
<div :style="[styleObject1, styleObject2]" />
```

## Further Readings

- [A Complete Guide to Data Attributes](https://css-tricks.com/a-complete-guide-to-data-attributes/)
- [The CSS attr() function got nothin’ on custom properties](https://css-tricks.com/css-attr-function-got-nothin-custom-properties/)
- [Class and Style Bindings](https://v2.vuejs.org/v2/guide/class-and-style.html)

