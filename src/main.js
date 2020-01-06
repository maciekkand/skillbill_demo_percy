import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import store from './store/store'
import routes from './routes'
import './registerServiceWorker'

Vue.use(Vuetify)
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history',
})

const vm = new Vue({
  store,
  router,
  render: h => h(App),
})

vm.$mount('#app')
