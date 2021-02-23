import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {path:'/login',name:'Login',component:()=>import('@/views/Login.vue')},
  {path:'/register',name:'Register',component:()=>import('@/views/Register.vue')}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  NProgress.start()
  next()
})

router.afterEach(()=>{
  NProgress.done()
})

export default router
