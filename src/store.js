import Vue from 'vue'
import Vuex from 'vuex'
import {axios_get} from './api/http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: -1,
    username: '',
    avatarUrl: 'http://1.15.90.245/img/Photo-2020-11-01-15-22-45.jpg',
    email: '',
    birthday: '',
    private: '',
    gender: '',
    profile: '',
  },
  mutations: {
    login(state, payload) {
      state.id = payload.id
      state.username = payload.username
      if(payload.avatarUrl != null) {
        state.avatarUrl = payload.avatarUrl
      }
      state.email = payload.email
      state.birthday = payload.birthday
      state.private = payload.private
      state.gender = payload.gender
      state.profile = payload.profile
    }
  },
  actions: {
    getUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios_get('http://1.15.90.245:9001/getuser/' + payload)
        .then(res => {
          context.commit("login", res)
        })
      })
    }
  },
  modules: {
    // 调用
    // state: $store.state.a....
    // mutation: 不变,所以方法名不能和外面的重复
    mask: {
      state:{
        maskShow: false,
        maskImg: ""
      },
      mutations:{
        maskChange(state) {
          state.maskShow = !state.maskShow
        },
        imgChange(state, imgUrl) {
          state.maskImg = imgUrl
        }
      },
      actions:{},
      getters:{}
    }
  }
})
