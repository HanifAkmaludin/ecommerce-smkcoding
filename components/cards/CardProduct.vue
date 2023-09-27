<script lang="ts" setup>
// import { Products } from '~/types/products';
const props = defineProps({
  product: {
    type: Object,
    default: {},
  }
});

import { productsStore } from "~/stores/products";

const { baseStorageUrl } = useAppConfig();
const useProductsStore = productsStore();

// const oneProduct = ref(props.product);

// watch(() => props.product, (currentValue, oldValue) => {
//   oneProduct.value = currentValue;
// })

// const addCart = () => {
//   oneProduct.value.isCart = !oneProduct.value.isCart
//   let localStorageData = localStorage.getItem("products");
//   let productOfCart: Products[] = [];

//   if (localStorageData) {
//     productOfCart = JSON.parse(localStorageData);
//   }

//   if (oneProduct.value.isCart) {
//     productOfCart.push(oneProduct.value);
//     localStorage.setItem("products", JSON.stringify(productOfCart));
//   } else {
//     productOfCart = productOfCart.filter((item) => item.id !== oneProduct.value.id);
//     localStorage.setItem("products", JSON.stringify(productOfCart));
//   }
// }

const addCart = async () => {
  const payload = props.product;
  payload.isCart = !payload.isCart;
  await useProductsStore.updateProduct(payload, payload.id);
}
</script>



<template>
  <section class="bg-white shadow-card rounded-xl overflow-hidden">
    <div :class="`w-full h-[200px] p-5 bg-gray-300`">
      <img :src="baseStorageUrl + props.product.image" class="w-full h-full object-contain"/>
    </div>
    <div class="px-5 pb-5 pt-9 relative">
      <NuxtLink :to="`/product/${props.product.id}`" ><h3 class="text-lg font-bold mb-4 text-limit limit-2">{{ props.product.name }}</h3></NuxtLink>
      <div class="flex justify-between items-center">
        <span class="text-sm font-normal">{{ props.product.category }}</span>
        <span class="text-sm font-normal">${{ props.product.price }}</span>
      </div>
      <div :class="`cursor-pointer absolute -top-5 right-7 w-[50px] h-[50px] ${props.product.isCart ? 'bg-blue-600 text-white' : 'bg-white'} shadow-xl rounded-full flex justify-center items-center hover:bg-blue-600 hover:text-white transition duration-300`" @click="addCart">
        <i class="ri-shopping-cart-2-line"></i>
      </div>
    </div>
  </section>
</template>