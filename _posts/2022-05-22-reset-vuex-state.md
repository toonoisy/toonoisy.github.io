---
layout: post
title: Vuex 重置 state 对象
date: 2022-05-22 18:49
categories: vuex
---
```js
// Declare a function instead of a variable to get a "clean" object everytime we call it
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

**Source:** **[How to clear state in vuex store?](https://stackoverflow.com/questions/42295340/how-to-clear-state-in-vuex-store)**