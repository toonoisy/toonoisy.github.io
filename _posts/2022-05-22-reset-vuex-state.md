---
layout: post
title: Vuex 重置 state 对象
date: 2022-05-22 18:49
categories: vuex
---
```js
/*
  Declare a function to get a "clean" object when called
  This is similar to why Vue component data option must be a function instead of an object
*/
const getDefaultState = () => {
  return {
    id: '',
    list: []
  }
}

// initial state
const state = getDefaultState()

const actions = {
  resetStateMsg ({ commit }) {
    commit('resetState')
  }
}

const mutations = {
  resetState (state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, getDefaultState())
  }
}

export default {
  state,
  getters: {},
  actions,
  mutations
}
```

**source: [How to clear state in vuex store?](https://stackoverflow.com/questions/42295340/how-to-clear-state-in-vuex-store), with additional comments added.**

