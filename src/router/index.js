import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import testPage from '@/components/TestPage.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/app',
      name: 'HelloWorld2',
      component: HelloWorld
    },
    {
      path: '/page1',
      name: 'testPage',
      component: testPage
    }
  ]
})

export default router
