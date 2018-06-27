import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/calendar',
      name: 'calendar',
      component: require('@/pages/Calendar').default
    },
    {
      path: '/',
      name: 'welcome',
      component: require('@/pages/Welcome').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
