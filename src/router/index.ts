import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutAuth from '../layouts/auth/layout-auth.vue'
import LayoutApp from '../layouts/app/layout-app.vue'
import Login from '../views/auth/login/page-login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: LayoutAuth,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
        },
      ],
    },
    {
      path: '/',
      component: LayoutApp,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
      ],
    },
  ],
})

export default router
