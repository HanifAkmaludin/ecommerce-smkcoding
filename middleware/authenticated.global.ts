import useAuth from  "~/composables/useAuth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { getAuthorizationToken } = useAuth();
  const token = getAuthorizationToken();
  
  if(token){
    if(to.path === "/login"){
      return navigateTo(from.path)
    }
  }
})