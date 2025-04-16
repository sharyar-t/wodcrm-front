import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "dashboard" },
    },
    {
      name: "app",
      path: "/",
      component: AppLayout,
      redirect: { name: "Dashboard" },
      children: [
        {
          name: "Dashboard",
          path: "dashboard",
          component: () => import("@/pages/Dashboard.vue"),
        },
        {
          name: "Companies",
          path: "companies",
          component: () => import("@/pages/companies/Companies.vue"),
        },
      ],
    },
    {
      path: "/auth",
      component: AuthLayout,
      children: [
        {
          name: "SignIn",
          path: "sign-in",
          component: () => import("@/pages/auth/SignIn.vue"),
        },
        {
          path: "",
          redirect: { name: "SignIn" },
        },
      ],
    },
  ],
});

export default router;
