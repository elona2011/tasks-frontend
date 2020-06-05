import Vue from 'vue'
import App from './App.vue'
import { MdButton, MdContent, MdToolbar, MdField, MdCard, MdBottomBar } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import TaskPublish from './components/TaskPublish'
import TaskPublishSuccess from './components/TaskPublishSuccess'
import FillDyid from './components/FillDyid'
import UserAccount from './components/UserAccount'
import UserAccountSuccess from './components/UserAccountSuccess'
import UserTasksNew from './components/UserTasksNew'
import UserTasksMy from './components/UserTasksMy'
import UserTaskStart from './components/UserTaskStart'
import UserTaskDetail from './components/UserTaskDetail'

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdToolbar)
Vue.use(MdField)
Vue.use(MdCard)
Vue.use(MdBottomBar)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { name: 'dd', path: '/', component: FillDyid },
  { name: 'publish', path: '/publish/:token', component: TaskPublish },
  { name: 'publishsuccess', path: '/publishsuccess/:token', component: TaskPublishSuccess },
  { name: 'filldyid', path: '/filldyid/:token', component: FillDyid },
  { name: 'UserAccount', path: '/useraccount/:token', component: UserAccount },
  { name: 'UserAccountSuccess', path: '/useraccountsuccess/:token', component: UserAccountSuccess },
  { name: 'UserTasksNew', path: '/usertasksnew/:token', component: UserTasksNew },
  { name: 'UserTasksMy', path: '/usertasksmy/:token', component: UserTasksMy },
  { name: 'UserTaskStart', path: '/usertaskstart/:id/:token', component: UserTaskStart },
  { name: 'UserTaskDetail', path: '/usertaskdetail/:id/:token', component: UserTaskDetail },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
