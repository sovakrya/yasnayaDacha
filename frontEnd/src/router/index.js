import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user',
      component: () => import('../views/TheUser.vue')
    },

    {
      path: '/admin',
      name: 'admin,',
      component: () => import('../views/TheAdmin.vue'),
      redirect: { name: 'adminRooms' },
      children: [
        {
          path: 'rooms',
          name: 'adminRooms',
          component: () => import('../views/AdminRooms.vue')
        },

        {
          path: 'users',
          name: 'adminUsers',
          component: () => import('../views/AdminUsers.vue')
        },

        {
          path: 'booking',
          name: 'adminBooking',
          component: () => import('../views/AdminBooking.vue')
        }
      ]
    }
  ]
})

export default router
