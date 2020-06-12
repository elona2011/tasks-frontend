import PublishTask from './components/PublishTask'
import PublishDetail from './components/PublishDetail'
import PublishMy from './components/PublishMy'
import PublishTaskSuccess from './components/PublishTaskSuccess'
import FillDyid from './components/FillDyid'
import UserAccount from './components/UserAccount'
import UserAccountSuccess from './components/UserAccountSuccess'
import UserTasksNew from './components/UserTasksNew'
import UserTasksMy from './components/UserTasksMy'
import UserMy from './components/UserMy'
import UserPay from './components/UserPay'
import UserPayDetail from './components/UserPayDetail'
import UserTaskStart from './components/UserTaskStart'
import UserTaskDetail from './components/UserTaskDetail'
import PageError from './components/PageError'
import VueRouter from 'vue-router'

const routes = [
    { name: 'PageError', path: '/pageerror', component: PageError },
    { name: 'publish', path: '/publish/:token', component: PublishTask },
    { name: 'publishsuccess', path: '/publishsuccess/:token', component: PublishTaskSuccess },
    { name: 'PublishMy', path: '/publishmy/:token', component: PublishMy },
    { name: 'PublishDetail', path: '/publishdetail/:id/:token', component: PublishDetail },
    { name: 'filldyid', path: '/filldyid/:token', component: FillDyid },
    { name: 'UserAccount', path: '/useraccount/:token', component: UserAccount },
    { name: 'UserAccountSuccess', path: '/useraccountsuccess/:token', component: UserAccountSuccess },
    { name: 'UserTasksNew', path: '/usertasksnew/:token', component: UserTasksNew },
    { name: 'UserTasksMy', path: '/usertasksmy/:token', component: UserTasksMy },
    { name: 'UserMy', path: '/usermy/:token', component: UserMy },
    { name: 'UserPay', path: '/userpay/:token', component: UserPay },
    { name: 'UserPayDetail', path: '/userpaydetail/:id/:token', component: UserPayDetail },
    { name: 'UserTaskStart', path: '/usertaskstart/:id/:token', component: UserTaskStart },
    { name: 'UserTaskDetail', path: '/usertaskdetail/:id/:token', component: UserTaskDetail },
]

export const router = new VueRouter({
    routes // short for `routes: routes`
})
