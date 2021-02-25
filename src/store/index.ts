import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{},
    isLogin:false,
    columns: [
      {
        title:'患者姓名',
        dataIndex: 'PatientName',
        key: 'PatientName',
      },
      {
        title: '患者ID',
        dataIndex: 'PatientID',
        key: 'PatientID',
      },
      {
        title: '医生姓名',
        dataIndex: 'DoctorName',
        key: 'DoctorName',
      },
      {
        title: '医生ID',
        key: 'DoctorID',
        dataIndex: 'DoctorID',
      },
      {
        title: '操作',
        key: 'Action',
        scopedSlots: { customRender: 'action' },
      },
    ],
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
      state.isLogin = true
    },
    logout(state){
      state.user = {}
      state.isLogin=false
    },
  },
  actions: {
  },
  modules: {
  }
})
