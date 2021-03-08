import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base.css'
import './antd'
import axios from 'axios'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

Vue.prototype.$ajax = axios;
