import { authStore } from "~/stores/auth";
import useAuth from  "~/composables/useAuth";

export default defineNuxtRouteMiddleware((to, from) => {
  const useAuthStore = authStore();
  const { getAuthorizationToken } = useAuth();
  // const token = localStorage.getItem("access_token");
  const token = getAuthorizationToken();
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