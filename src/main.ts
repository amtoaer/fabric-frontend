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
    }else{
      message.success(response.data.message)
    }
    // 返回请求执行结果，便于后续进行特定处理
    return response
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
