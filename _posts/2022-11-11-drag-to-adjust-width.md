---
layout: post
title: 拖拽调整两侧元素宽度
date: 2022-11-11 16:38
categories: [web_dev, lang:zh]
---

## 效果

两个并排占满屏幕的块级元素，实现中间拖拽调整两侧宽度。

## 利用 CSS resize 属性实现的简单 demo

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
</head>
<body>
  <main>
    <div class="left">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque quisquam illum tempora totam, vero dolorem dolorum magni expedita eligendi beatae repudiandae sit labore provident dignissimos placeat non qui perspiciatis voluptatem!</div>
    <div class="right">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, mollitia ea similique soluta ab nulla voluptate ex nemo nam voluptatem praesentium, beatae, magnam maxime dolorem esse tempore adipisci nostrum expedita.</div>
  </main>
  <style>
    main {
      display: flex;
      border: 1px solid black;
      height: 100%;
    }
    main div {
      width: 50%;
      overflow: auto;
    }
    .left {
      resize: horizontal; /* 元素可水平方向伸缩 */
      overflow: auto;
      border-right: 1px solid black;
    }
    .right {
      flex: 1 0;
    }
  </style>
</body>
</html>
```

## 操作 DOM 实现适用性更好的 demo (Vue)

```vue
<template>
  <main>
    <div class="box">
      <div class="left">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, iste
        laudantium quia quibusdam possimus, commodi adipisci pariatur nesciunt
        fugiat illo harum dolorem vitae ullam inventore repellat assumenda minus
        beatae voluptates.
      </div>
      <div class="resize"></div>
      <div class="right">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, iste
        laudantium quia quibusdam possimus, commodi adipisci pariatur nesciunt
        fugiat illo harum dolorem vitae ullam inventore repellat assumenda minus
        beatae voluptates.
      </div>
    </div>
  </main>
</template>
<script>
export default {
  mounted() {
    this.dragControllerDiv();
  },

  methods: {
    dragControllerDiv() {
      var resize = document.getElementsByClassName("resize")[0];
      var left = document.getElementsByClassName("left")[0];
      var right = document.getElementsByClassName("right")[0];
      var box = document.getElementsByClassName("box")[0];
      resize.onmousedown = function (e) {
        var startX = e.clientX;
        resize.left = resize.offsetLeft;
        // 鼠标拖动事件
        document.onmousemove = function (e) {
          var endX = e.clientX;
          var moveLen = resize.left + (endX - startX); // endx-startx = 移动的距离。resize.left+移动的距离=左边区域最后的宽度
          var maxT = box.clientWidth - resize.offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

          if (moveLen < 150) moveLen = 150; // 左边区域的最小宽度为150px
          if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px

          resize.style.left = moveLen; // 设置左侧区域的宽度

          left.style.width = moveLen + "px";
          right.style.width = box.clientWidth - moveLen - 10 + "px";
        };
        // 鼠标松开事件
        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
          resize.releaseCapture && resize.releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
        };
        resize.setCapture && resize.setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
        return false;
      };
    },
  },
};
</script>
<style scoped>
.box {
  width: 100%;
  height: 100%;
  margin: 1% 0px;
  overflow: hidden;
}
.left {
  width: calc(50% - 5px);
  min-width: calc(20% - 5px);
  height: 100%;
  float: left;
}
.resize {
  width: 5px;
  height: 100%;
  cursor: col-resize;
  float: left;
}
.right {
  float: left;
  width: 50%;
  max-width: 80%;
  height: 100%;
  background: #f3f3f3;
}
</style>
```

## 参考

- [resize - CSS: Cascading Style Sheets \| MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/resize)
- [vue中实现拖动调整左右两侧div的宽度 - lngrid - 博客园](https://www.cnblogs.com/ingrid/p/12766457.html)