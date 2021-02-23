import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null,
    isLogin:false,
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
      state.isLogin = true
    },
    logout(state){
      state.user = null
      state.isLogin=false
    }
  },
  actions: {
  },
  modules: {
  }
})
