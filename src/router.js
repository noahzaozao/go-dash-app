import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: () => import('./views/Dashboard.vue')
                },
                {
                    path: 'notification',
                    name: 'notification',
                    component: () => import('./views/NotificationCenter.vue')
                }
            ]
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/Register.vue')
        }
    ]
});

router.beforeEach(function (to, from, next) {
    const auth = store.state.auth;
    // const nextRoute = ['login', 'register'];
    // if (nextRoute.indexOf(to.name) < 0) {
    //     if (!auth.IsLogin) {
    //         router.push({ name: 'login' });
    //     }
    // }
    if (to.name === 'login') {
        if (auth.IsLogin) {
            router.push({ name: 'home' });
        }
    }
    next();
});

export default router;
