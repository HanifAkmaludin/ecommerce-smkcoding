<script lang="ts" setup>
import { authStore } from '~/stores/auth';
import { storeToRefs } from 'pinia';
import useAuth from '~/composables/useAuth';


const { rmAuthorizationToken, rmRefreshToken, getAuthorizationToken } = useAuth();
const useAuthStore = authStore();
// const getAccessToken = () => {
//   return localStorage.getItem("access_token");
// }
const isAuthenticated = ref();

onMounted(() => {
  // isAuthenticated.value = useAuthStore.getAccessToken();
  isAuthenticated.value = getAuthorizationToken();
})

const logout = async () => {
  // localStorage.clear();
  await rmAuthorizationToken();
  await rmRefreshToken();
  // isAuthenticated.value = useAuthStore.getAccessToken();
  isAuthenticated.value = getAuthorizationToken();
  navigateTo("/");
}
</script>

<template>
  <header class="w-full border-b border-slate-200 py-6">
    <div class="container">
      <div class="flex justify-between items-center">
        <div>
          <NuxtLink to="/" class="text-xl font-bold">SMK Coding</NuxtLink>
        </div>
        <nav class="flex items-center gap-6">
          <NuxtLink to="/" class="text-base">Home</NuxtLink>
          <NuxtLink to="/product" class="text-base">Products</NuxtLink>
          <NuxtLink to="/cart" class="text-base">Cart</NuxtLink>
          <NuxtLink v-if="!isAuthenticated" to="/login" class="text-base bg-blue-600 px-6 py-2 text-white rounded-lg hover:bg-blue-600/80">Login</NuxtLink>
          <div v-else class="text-base cursor-pointer bg-red-600 px-6 py-2 text-white rounded-lg hover:bg-red-600/80" @click="logout">Logout</div>
        </nav>
      </div>
    </div>
  </header>
</template>