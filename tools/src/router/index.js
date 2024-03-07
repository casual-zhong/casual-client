import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import mails from '../views/Mails/Mails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: mails
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
