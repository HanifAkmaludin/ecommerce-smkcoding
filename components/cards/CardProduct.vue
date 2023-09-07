<script lang="ts" setup>
const props = defineProps({
  product: {
    type: Object,
    default: {},
  }
})

const oneProduct = ref(props.product);
</script>



<template>
  <section class="bg-white shadow-lg rounded-xl overflow-hidden">
    <div :class="`w-full h-[200px] p-5 ${oneProduct.color}`">
      <img :src="oneProduct.image" class="w-full h-full object-contain"/>
    </div>
    <div class="px-5 pb-5 pt-9 relative">
      <NuxtLink :to="`/product/${oneProduct.id}`" ><h3 class="text-lg font-bold mb-4 text-limit limit-2">{{ oneProduct.name }}</h3></NuxtLink>
      <div class="flex justify-between items-center">
        <span class="text-sm font-normal">{{ oneProduct.category }}</span>
        <span class="text-sm font-normal">${{ oneProduct.price }}</span>
      </div>
      <div :class="`cursor-pointer absolute -top-5 right-7 w-[50px] h-[50px] ${oneProduct.isCart ? 'bg-blue-600 text-white' : 'bg-white'} shadow-xl rounded-full flex justify-center items-center hover:bg-blue-600 hover:text-white transition duration-300`" @click="oneProduct.isCart = !oneProduct.isCart">
        <i class="ri-shopping-cart-2-line"></i>
      </div>
    </div>
  </section>
</template>