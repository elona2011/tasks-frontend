import PublishMenu from './components/PublishMenu'
import PublishNew from './components/PublishNew'
import PublishDetail from './components/PublishDetail'
import PublishMy from './components/PublishMy'
import PublishCheck from './components/PublishCheck'
import PublishPay from './components/PublishPay'
import PublishTaskSuccess from './components/PublishTaskSuccess'
import FillDyid from './components/FillDyid'
import UserMenu from './components/UserMenu'
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
// import MainPage from './components/MainPage'
import VueRouter from 'vue-router'

const routes = [
    { path: '/:token', redirect: '/publish/new/:token' },
    { path: '/', redirect: '/pageerror' },
    { name: 'PageError', path: '/pageerror', component: PageError },
    {
        name: 'PublishMenu',
        path: '/publish',
        component: PublishMenu,
        children: [
            { name: 'PublishNew', path: 'new/:token', component: PublishNew, meta: { title: '发布任务' } },
            { name: 'PublishMy', path: 'my/:token', component: PublishMy, meta: { title: '我的发布' } },
            { name: 'PublishPay', path: 'pay/:token', component: PublishPay, meta: { title: '充值' } },
            { name: 'PublishTaskSuccess', path: 'success/:token', component: PublishTaskSuccess, meta: { title: '发布成功' } },
            { name: 'PublishDetail', path: 'detail/:id/:token', component: PublishDetail, meta: { title: '发布详情' } },
            { name: 'PublishCheck', path: 'check/:id/:token', component: PublishCheck, meta: { title: '任务审核' } },
        ]
    },
    {
        name: 'UserMenu',
        path: '/user',
        component: UserMenu,
        children: [
            { name: 'UserTasksNew', path: 'new/:token', component: UserTasksNew, meta: { title: '新任务' } },
            { name: 'UserMy', path: 'my/:token', component: UserMy, meta: { title: '我的' } },
            { name: 'UserTasksMy', path: 'mytask/:token', component: UserTasksMy, meta: { title: '我的任务' } },
            { name: 'UserTaskStart', path: 'taskstart/:id/:token', component: UserTaskStart, meta: { title: '开始任务' } },
            { name: 'UserTaskDetail', path: 'taskdetail/:id/:token', component: UserTaskDetail, meta: { title: '任务详情' } },
            { name: 'UserPay', path: 'pay/:token', component: UserPay, meta: { title: '我的提现' } },
            { name: 'UserPayDetail', path: 'paydetail/:id/:token', component: UserPayDetail, meta: { title: '提现详情' } },
            { name: 'filldyid', path: 'filldyid/:token', component: FillDyid },
            { name: 'UserAccount', path: 'account/:token', component: UserAccount },
            { name: 'UserAccountSuccess', path: 'accountsuccess/:token', component: UserAccountSuccess },
        ]
    },
]

export const router = new VueRouter({
    routes // short for `routes: routes`
})
