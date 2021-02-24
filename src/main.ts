import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios, { AxiosStatic } from 'axios'
import {message} from 'ant-design-vue'
import { Message } from 'ant-design-vue/types/message'


// request拦截并加上token 
axios.interceptors.request.use(
    config=>{
        if (localStorage.getItem('token')){
            config.headers.Authorization = localStorage.getItem('token')
        }
        return config
    },
    err=>{
        return Promise.reject(err)
    }
)

// response拦截并处理请求结果
axios.interceptors.response.use(
  response=>{
    // 对返回结果进行通用化处理
    if (!response.data.success){
      message.error(response.data.message)
      if (response.data.message==='身份信息失效，请重新登录'){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        store.commit('logout')
        router.replace({
          path:'/login'
        })
      }
    }
    // 返回请求执行结果，便于后续进行特定处理
    return response
  },
  err=>{
    message.error(`出现错误，错误信息为：${err}`)
  }
)

Vue.prototype.$axios = axios
Vue.prototype.$msg = message

declare module 'vue/types/vue'{
  interface Vue{
    $axios: AxiosStatic;
    $msg: Message;
  }
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
