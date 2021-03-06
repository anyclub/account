import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import utils from './global/utils'
import './components/installComponent'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/style/reset.css'
import './assets/style/flex.css'
// import 'flex.css'
import './assets/style/base.css'

import '../../static/icon/iconfont.css'

Vue.use(utils)

Vue.use(ElementUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
