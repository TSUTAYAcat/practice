import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/cart',
        name: 'cart',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Cart.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Profile.vue')
    },
    {
        path: '/category',
        name: 'category',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Category.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router