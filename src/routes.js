import PublishMenu from './pages/PublishMenu'
import PublishNew from './pages/PublishNew'
import PublishNewWx from './pages/PublishNewWx'
import PublishNewType from './pages/PublishNewType'
import PublishDetail from './pages/PublishDetail'
import PublishMy from './pages/PublishMy'
import PublishCheck from './pages/PublishCheck'
import PublishPay from './pages/PublishPay'
import PublishTaskSuccess from './pages/PublishTaskSuccess'
import FillDyid from './pages/FillDyid'
import UserMenu from './pages/UserMenu'
import UserAccount from './pages/UserAccount'
import UserAccountSuccess from './pages/UserAccountSuccess'
import UserTasksNew from './pages/UserTasksNew'
import UserTasksMy from './pages/UserTasksMy'
import UserMy from './pages/UserMy'
import UserPay from './pages/UserPay'
import UserPayDetail from './pages/UserPayDetail'
import UserTaskStart from './pages/UserTaskStart'
import UserTaskDetail from './pages/UserTaskDetail'
import PageError from './pages/PageError'
// import MainPage from './pages/MainPage'
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
            { name: 'PublishNew', path: 'new/:token', component: PublishNew, meta: { title: '发布D音任务' } },
            { name: 'PublishNewWx', path: 'newwx/:token', component: PublishNewWx, meta: { title: '发布视频号任务' } },
            { name: 'PublishNewType', path: 'newtype/:token', component: PublishNewType, meta: { title: '发布任务' } },
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
            { name: 'UserTasksMy', path: 'mytask/:state/:token', component: UserTasksMy, meta: { title: '我的任务' } },
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
