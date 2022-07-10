---
layout: post
title: Vue CLI 中的 main.js 文件是什么
date: 2022-06-01 20:30
categories: vue
---

`main.js` 是 Vue 项目的入口文件，它的主要作用有以下几个：

- 初始化 Vue 实例

  - Vue 2.x 中的写法

    ```js
    // 构造一个 Vue 实例，传入一个选项对象，实现想要的创建行为
    new Vue({
        // 通过 render 函数渲染主组件 App.vue，创建 VNode (虚拟 DOM)
        render: h => h(App), // h 是 createElement 函数的别名
        // 注入路由和状态管理库
        router,
        store
    }).$mount('#app') // 通过 $mount 方法将虚拟DOM挂载到 index.html 文件中的指定元素上
    ```

  - Vue 3.x 写法有异，意图是一样的

    ```js
    // 使用从 Vue 中解构出来的 createApp 方法创建 Vue 实例
    const app = createApp(App);
    // 直接通过 use 方法安装路由和状态管理库，无需额外注入
    app.use(router).use(store).mount('#app');
    ```

- 安装 Vue 插件 

  - Vue 2.x 中，需要在调用 `new Vue()` 前通过 `Vue.use()` 使用插件，同一组件多次使用只会运行一次；Vue 3.x 则在实例挂载前调用 `use()` 即可
  - 如果插件是一个对象，则它必须暴露一个 `install` 方法。如果插件本身是一个函数，则它将被视为 `install` 方法；该 `install` 方法第一个参数是 `Vue` ，第二个参数是一个可选的选项对象

- 引入公共 css 文件

- 定义全局组件、mixin、自定义指令，和过滤器 (Vue 3.x 不再支持过滤器)

- 配置全局 property

  ```js
  // Vue 2.x 方案, 拓展 Vue 实例原型上的属性/方法，使其可以在任意实例上读取
  Vue.prototype.$http = () => {};
  
  // Vue 3.x 方案, 拓展配置项 config 对象的 globalProperties
  const app = createApp({});
  app.config.globalProperties.$http = () => {};
  ```



---

**References:**

- [Vue 2 - API](https://cn.vuejs.org/v2/api/)
- [Vue 3 - API](https://v3.cn.vuejs.org/api/)
- [How to filter items in Vue 3？](https://stackoverflow.com/questions/66263545/how-to-filter-items-in-vue-3)
- [Vue经典面试题: Vue.use和Vue.prototype.$xx有血缘关系吗?](https://juejin.cn/post/6844903876458446856)
- [How to use Vue.prototype or global variable in Vue 3?](https://juejin.cn/post/6844903876458446856)

