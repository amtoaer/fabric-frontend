import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{},
    isLogin:false,
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
      state.isLogin = true
    },
    logout(state){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      state.user = {}
      state.isLogin=false
    },
  },
  actions: {
  },
  modules: {
  }
})
