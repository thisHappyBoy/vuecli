import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'
import headTop from "./components/headTop.vue"
import personalCenter from './views/personalCenter.vue'

Vue.use(Router);

//通用权限通用路由表，一些不用权限的公用页面
export const commonRouterMap = [
    {path: '/login', component: login},
    {
        path: '/',
        component: login,
        // redirect: '/dashboard',
        // name: '首页',
        // children: [{path: 'dashboard', component: dashboard}]
    },
    {
        path: '/headTop',
        component: headTop,
        name: '',
        children: [
            {
                path: '/personalCenter',
                component: personalCenter,
                name: '个人中心',
            }]
    },
    { path: '*', redirect: '/404', hidden: true }
];
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: commonRouterMap
})

//异步挂载的路由，动态需要根据权限加载的路由表
export const asyncRouterMap = [
    {path: '/login', component: login},
    {
        path: '/headTop',
        component: headTop,
        name: '',
        children: [
            {
                path: '/personalCenter',
                component: personalCenter,
                name: '个人中心',
            }]
    },
    { path: '*', redirect: '/404', hidden: true }
];
