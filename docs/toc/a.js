import Vue from 'vue'
import Router from 'vue-router'

//路由需要指向的页面
import Home from "@/pages/Home"

//按需加载的页面
const List =resolve => require(['@/components/List'], resolve);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/list',
            name: 'List',
            component: List
        },
    ],
    // mode:'history'
})