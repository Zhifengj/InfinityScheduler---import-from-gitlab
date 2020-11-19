import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import About from '@/views/About'
import Calendar from '@/views/Calendar'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/calendar',
            name: 'Calendar',
            component: Calendar
        }
    ]
})