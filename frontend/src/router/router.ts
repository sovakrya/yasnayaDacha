import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("../views/TheUser.vue"),
      props: ({ query }) => {
        return {
          childs: Number(query.childs) || undefined,
          adults: Number(query.adults) || undefined,
        };
      },
    },

    {
      path: "/admin",
      name: "admin,",
      component: () => import("../views/TheAdmin.vue"),
      redirect: { name: "adminRooms" },
      children: [
        {
          path: "rooms",
          name: "adminRooms",
          component: () => import("../views/AdminRooms.vue"),
        },

        {
          path: "users",
          name: "adminUsers",
          component: () => import("../views/AdminUsers.vue"),
        },

        {
          path: "booking",
          name: "adminBooking",
          component: () => import("../views/AdminBooking.vue"),
        },
      ],
    },
  ],
});
