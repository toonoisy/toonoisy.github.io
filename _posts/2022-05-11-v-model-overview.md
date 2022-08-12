---
layout: post
title: 理解 v-model
date: 2022-05-11 22:59
categories: vue
---

## 前言

Vue 通过使用 `Object.defineProperty` 创造响应式对象实现了数据变化通知视图更新，同时还提供了一个 `v-model` 指令作为双向数据绑定的接口，用来实现视图变化同步到数据。

不管是在表单元素还是在组件上使用， `v-model` 的本质都不过是语法糖。

## 表单元素使用 v-model

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

## 组件使用 v-model

> 一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件可能会将 `value` attribute 用于[不同的目的](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value)。`model` 选项可以用来避免这样的冲突。

在组件上使用 `v-model` ，本质是在使用自定义事件。

如下示例，在子组件 `model` 选项中定义一个 `prop` 名为 `modelVal` 和一个事件名为 `update`，再在父组件中使用 `v-model` 向子组件同步这个 `modelVal`。

这样做等同于直接向子组件传递名为 `modelVal` 的 `prop`，并绑定一个叫 `update` 的自定义事件，使子组件能够触发更新这个值。

```vue
<!-- 子组件 -->
<template>
  <div class="child">
    child component:
    <el-input
      :value="modelVal"
      @input="$emit('update', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'Child',
  // if model is not specified, prop is `value` and event is `input` by default
  model: {
    prop: 'modelVal',
    event: 'update',
  },
  // receive props from the parent component
  props: {
    modelVal: {
      type: String,
      default: '',
    },
  },
};
</script>
```

```vue
<!-- 父组件 -->
<template>
  <div class="demo">
    parent component:
    <el-input v-model="modelVal" />
    
    <!-- below two examples have the same effect -->
    -> test component v-model
    <child v-model="modelVal" />

    -> test component event
    <child
      :model-val="modelVal"
      @update="(val) => (modelVal = val)"
    />
  </div>
</template>

<script>
export default {
  name: 'Parent',
  components: {
    child: () => import('./child.vue')
  },
  data () {
    return {
      modelVal: 'component v-model is a syntactic sugar of component event'
    };
  }
};
</script>
```

## v-model 还有什么特点

如下代码中，`form` 是一个在 `data` 中初始声明的对象，`str` 则是一个未在 `form` 身上未声明的属性。由于 [Vue 本身不检测数组和对象的变化](https://github.com/vuejs/vue/issues/8562)，所以在 `input` 方法中使用了 `$set` 方法为 `form` 添加响应式 property。

```html
<input :value="form.str" @input="$set(form, 'str', $event.target.value)" />
```

那么直接写成下面这样能用吗？答案是可以。也就是说，如果给 v-model 绑定一个已声明的对象中不存在的属性，会自动触发 `$set` 将其添加为响应式。可以[点这里](https://github.com/vuejs/vue/blob/399b53661b167e678e1c740ce788ff6699096734/src/compiler/directives/model.js#L44)看源码实现。

```html
<input v-model="form.str" />
```

## References

- [表单输入绑定](https://cn.vuejs.org/v2/guide/forms.html)
- [自定义事件](https://cn.vuejs.org/v2/guide/components-custom-events.html)
- [v-model with uninitialized property](https://github.com/vuejs/vue/issues/3732#)
- [Warn when `v-model` is bound on non-existent key](https://github.com/vuejs/vue/issues/5932#)