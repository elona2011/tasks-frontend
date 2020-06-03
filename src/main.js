import Vue from 'vue'
import App from './App.vue'
import { MdButton, MdContent, MdToolbar, MdField, MdCard } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import TaskPublish from './components/TaskPublish'
import FillDyid from './components/FillDyid'

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdToolbar)
Vue.use(MdField)
Vue.use(MdCard)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: FillDyid },
  { path: '/publish', component: TaskPublish },
  { path: '/filldyid', component: FillDyid },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
