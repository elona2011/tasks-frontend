import Vue from 'vue'
import App from './App.vue'
import { MdButton, MdContent, MdToolbar, MdField, MdCard, MdBottomBar, MdProgress, MdList ,MdIcon} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import UserMenu from './components/UserMenu'
import UserTitle from './components/UserTitle'
import PublishMenu from './components/PublishMenu'
import { router } from "./routes";
import VueRouter from 'vue-router'

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdToolbar)
Vue.use(MdField)
Vue.use(MdCard)
Vue.use(MdBottomBar)
Vue.use(MdProgress)
Vue.use(MdList)
Vue.use(MdIcon)
Vue.use(VueRouter)
Vue.config.productionTip = false

Vue.component('user-menu', UserMenu)
Vue.component('user-title', UserTitle)
Vue.component('publish-menu', PublishMenu)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')