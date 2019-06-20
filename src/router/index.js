import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

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
          component: () => import('../views/Dashboard.vue')
        },
        {
          path: 'notification',
          name: 'notification',
          component: () => import('../views/Notification.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    }
  ]
});

router.beforeEach(function (to, from, next) {
  const jwtToken = localStorage.getItem('jwt_token');
  const nextRoute = ['login', 'register'];
  if (nextRoute.indexOf(to.name) < 0) {
    if (!jwtToken) {
      router.push({ name: 'login' });
    }
  }
  if (to.name === 'login' || to.name === 'register') {
    if (jwtToken) {
      router.push({ name: 'home' });
    }
  }
  next();
});

export default router;
