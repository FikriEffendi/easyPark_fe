import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutAuth from '../layouts/auth/layout-auth.vue'
import LayoutApp from '../layouts/app/layout-app.vue'
import Login from '../views/auth/login/page-login.vue'
import Register from '../views/auth/register/page-register.vue'
import PageDashboard from '../views/dashboard/page-dashboard.vue'
import PageBooking from '../views/booking/page-booking.vue'
import PageRiwayat from '../views/riwayat/page-riwayat.vue'
import PageRiwayatDetail from '@/views/detail-riwayat/page-riwayat-detail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: LayoutAuth,
      children: [
        {
          path: '/login',
          name: 'login',
          component: Login,
        },
        {
          path: '/register',
          name: 'register',
          component: Register,
        },
      ],
    },
    {
      path: '/',
      component: LayoutApp,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: PageDashboard,
          meta: { requiresAuth: true },
        },
        {
          path: 'booking',
          name: 'booking',
          component: PageBooking,
          meta: { requiresAuth: true },
        },
        {
          path: 'riwayat',
          name: 'riwayat',
          component: PageRiwayat,
          meta: { requiresAuth: true },
        },
        {
          path: 'riwayat/:id',
          name: 'riwayat-detail',
          component: PageRiwayatDetail,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
})

//Authentication Guard
router.beforeEach((to, from, next) => {
  //Untuk mengecek apakah sudah login
  const isAuthenticated = () => {
    //Cek token di lokalStorage/sessionStorage
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
    return !!token
  }

  //Jika halaman memerlukan auth
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      //Redirect ke halaman login
      next({
        name: 'login',
        query: {
          redirect: to.fullPath,
        }, //Menyimpan halaman tujuan untk redirect setelah login
      })
    } else {
      next() //Lanjut ke halaman tujuan
    }
  } else {
    //jika user sudah login dan mengakses halaman auth, redirect ke home
    if (isAuthenticated() && to.path.startsWith('/auth')) {
      next({ name: 'home' })
    } else {
      next() //Lanjut ke halaman tujuan
    }
  }
})

export default router
