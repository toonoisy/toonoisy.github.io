---
layout: post
title: 替换 CSS rgba() 中的 alpha 值
date: 2022-11-21 16:38 +0800
categories: [notes, lang:zh]
---

最近在用 [FullCalendar](https://fullcalendar.io/) 写日历，日历上的事件支持更换背景色，为了使文字显示效果更好，我们给背景色设置了透明度，即元素的 background-color 属性是一个 [rgba()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgba) 格式的值，但在一些场景中，我们需要自行控制该颜色的透明度，即按需修改 RGBA 中的 alpha 值。

最简单的方法是[用正则表达式替换](https://stackoverflow.com/questions/16065998/replacing-changing-alpha-in-rgba-javascript)，例如：

```js
var color="rgba(30, 43, 2, 0.498039)";
color = color.replace(/[\d\.]+\)$/g, '1)'); // 不透明度修改为 1
console.log(color); // rgba(30, 43, 2, 1)
```

