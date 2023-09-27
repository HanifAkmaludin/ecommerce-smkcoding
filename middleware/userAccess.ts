import { authStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const useAuthStore = authStore();
  const token = localStorage.getItem("access_token");
  if (!token) {
    useAuthStore.message = "Mohon Login terlebih dahulu";
    useAuthStore.status = false;
    if (to.path !== "/login") {
      return navigateTo("/login")
    }
  } else {
    if (to.path !== "/product" && to.path !== "/cart") {
      return navigateTo(to.path);
    }
  }
})