<script lang="ts" setup>
import { Products } from '~/types/products';
// let products = ref<Products[]>([]);

// onMounted(() => {
//   let localStorageData = localStorage.getItem("products");
//   if (localStorageData) {
//     products.value = JSON.parse(localStorageData);
//   }
// })

// const removeCart = (id: number) => {
//   products.value = products.value.filter((item) => item.id !== id);
//   localStorage.setItem("products", JSON.stringify(products.value));
// }

import { productsStore } from '~/stores/products';

const useProductsStore = productsStore();
const products = ref<Products[]>([]);
const isLoading = ref(false);

const totalProduct = computed(() => {
  if (products) {
    return products.value.reduce((total, product) => total + ((product.price || 0) * (product.quantity || 0)), 0);
  }
  return 0;
})

const getProducts = async () => {
  isLoading.value = true;
  useProductsStore.filterByIsCart(true).then(() => {
    products.value = useProductsStore.products;
    isLoading.value = false;
  })
}

getProducts();

const removeCart = async (id: number) => {
  const product = products.value.find((item) => item.id === id);
  if(product){
    product.isCart = !product.isCart
  }
  await useProductsStore.updateProduct(product, id);
  getProducts();
}

const setQuantity = async (id: number, state: string) => {
  const product = products.value.find((item) => item.id === id);
  if(state === "plus"){
    if(product?.quantity){
      product.quantity += 1;
      await useProductsStore.updateProduct(product, id);
    }
  }else if(state === "minus"){
    if(product?.quantity && product.quantity !== 1){
      product.quantity -= 1;
      await useProductsStore.updateProduct(product, id);
    }
  }
}
</script>


<template>
  <section>
    <div class="container">
      <div class="py-10 flex gap-6">
        <div class="w-[70%]">
          <div class="flex justify-between items-center pb-7 border-b border-gray-300 mb-6">
            <h1 class="text-3xl font-medium">Shopping Cart</h1>
            <p class="text-3xl font-medium">{{ products.length }} Items</p>
          </div>
            <div v-if="products.length > 0" class="flex flex-col gap-6">
              <template v-for="(item, index) in products" :key="index">
                <CardsCardCart :product="item" @removeCart="removeCart" @setQuantity="setQuantity"/>
              </template>
            </div>
            <div v-else>
              <h5 class="text-xl font-light text-center">Cart is empty</h5>
            </div>
        </div>
        <div class="w-[30%] bg-white shadow-card h-max p-6">
          <h3 class="text-xl font-medium mb-6">Order Summary</h3>
          <div class="flex flex-col gap-3 border-b border-gray-300 pb-4">
            <div v-if="products.length > 0">
              <div v-for="(item, index) in products" :key="index" class="flex gap-4 items-center">
                <span class="text-limit limit-1 text-sm">{{ item.name }}</span>
                <span class="text-sm font-semibold">${{ (item.price || 0) * (item.quantity || 0) }}</span>
              </div>
            </div>
            <div v-else>
              <p class="text-sm text-center font-light">There are no to orders yet</p>
            </div>
          </div>
          <div class="pt-4 flex items-center justify-between mb-6">
            <span class="text-base">Total</span>
            <span class="text-base font-bold">${{ totalProduct }}</span>
          </div>
          <button class="bg-blue-600 text-white text-base font-bold w-full py-2 rounded-lg">Checkout</button>
        </div>
      </div>
    </div>
  </section>
</template>