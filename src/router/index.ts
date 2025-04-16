import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { useAuthStore } from "@/stores/AuthStore";

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
          meta: {
            breadcrumbs: [{ name: "Dashboard", path: "/dashboard" }],
          },
        },
        {
          name: "Companies",
          path: "companies",
          component: () => import("@/pages/companies/Companies.vue"),
          meta: {
            breadcrumbs: [{ name: "Companies", path: "/companies" }],
          },
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

router.beforeEach((to, from, next) => {
  const userStore = useAuthStore();
  const token = localStorage.getItem("accessToken");

  // Страницы, которые не требуют авторизации
  const publicPages = ["/auth/sign-in"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && (!token || !userStore.userDetails)) {
    return next({ name: "SignIn" });
  }

  next();
});

export default router;
