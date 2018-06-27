import Vue from 'vue'

const requireComponent = require.context('.', false, /\.vue$/).keys()

requireComponent.forEach(fileName => {
  const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  const componentConfig = require(`./${componentName}.vue`)

  Vue.component(componentName, componentConfig.default || componentConfig)
})
