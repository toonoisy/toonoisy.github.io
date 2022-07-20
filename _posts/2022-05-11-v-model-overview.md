---
layout: post
title: 理解 v-model
date: 2022-05-11 22:59
categories: vue
---

## Vue 的响应式原理回顾

Vue 使用 [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 为所有在 `data` 选项中声明的属性遍历添加 [getter/setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#定义_getters_与_setters)，使其能在被访问或修改时通知组件对应的 `watcher` 实例。在组件进行渲染时，`watcher` 会将接触过的数据收集为依赖，之后当依赖项的 `setter` 触发时， `watcher` 收到通知就会重新渲染组件，从而实现数据和视图双向同步。

![how-changes-are-tracked-in-vue](https://cn.vuejs.org/images/data.png)

## Vue2 官方文档中对 v-model 的介绍

### 1. 表单元素双向数据绑定

> 你可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

> `v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：
>
> - text 和 textarea 元素使用 `value` property 和 `input` 事件；
> - checkbox 和 radio 使用 `checked` property 和 `change` 事件；
> - select 字段将 `value` 作为 prop 并将 `change` 作为事件。

即是说，以下两种写法等价：

```html
<input v-model="str" />
<input :value="str" @input="str = $event.target.value"/>
```

### 2. 在组件上使用 v-model

> 一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件可能会将 `value` attribute 用于[不同的目的](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value)。`model` 选项可以用来避免这样的冲突。

在组件上使用 `v-model` 时，本质是在使用自定义事件。

如下示例，在子组件 `model` 选项中定义一个 `prop` 名 `modelVal` 和一个事件名 `update`，再在父组件中使用 `v-model` 向子组件同步这个 `modelVal`，等同于直接向子组件传递名为 `modelVal` 的 `prop`，并绑定一个叫 `update` 的自定义事件，使子组件能够触发更新这个值。

```vue
<!-- 子组件 -->
<template>
  <div>
    我是子组件的 modelVal
    <el-input :value="modelVal" @input="$emit('update', $event)" />
  </div>
</template>

<script>
export default {
  name: 'child',
  model: {
    prop: 'modelVal',
    event: 'update'
  },
  props: {
    modelVal: {
      type: String,
      default: ''
    }
  }
}
</script>
```

```vue
<!-- 父组件 -->
<template>
  <div class="demo">
    我是父组件的 modelVal
    <el-input v-model="modelVal" />
    
    <div>* 使用 v-model 传来的值:</div>
    <child v-model="modelVal" />
    
    <div>* 使用自定义事件传来的值:</div>
    <child :modelVal="modelVal" @update="val => modelVal = val" />
  </div>
</template>

<script>
export default {
  name: "demo",
  components: {
    child: () => import("./child.vue"),
  },
  data() {
    return {
      modelVal: '在组件上使用 v-model 时，本质是在使用自定义事件。'
    };
  },
};
</script>
```

## v-model 还有什么特点

如下代码中，`form` 是一个在 `data` 中初始声明的对象，`str` 是一个未声明的属性。由于 Vue 不能检测数组和对象的变化，所以在 `input` 方法中使用了 `$set` 方法为 `form` 添加响应式 property。

```html
<input :value="form.str" @input="$set(form, 'str', $event.target.value)"/>
```

那么直接写成下面这样能用吗？答案是可以（但通常来说不推荐这样做，显式声明所有将会用到的属性更利于代码维护）。也就是说，如果给 v-model 绑定一个已声明对象中未声明的属性，会主动触发 `$set` 将其添加为响应式。可以[点这里](https://github.com/vuejs/vue/blob/399b53661b167e678e1c740ce788ff6699096734/src/compiler/directives/model.js#L44)看源码实现。

```html
<input v-model="form.str" />
```

## References

- [深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)
- [表单输入绑定](https://cn.vuejs.org/v2/guide/forms.html)
- [自定义事件](https://cn.vuejs.org/v2/guide/components-custom-events.html)
- [v-model with uninitialized property](https://github.com/vuejs/vue/issues/3732#)
- [Warn when `v-model` is bound on non-existent key](https://github.com/vuejs/vue/issues/5932#)