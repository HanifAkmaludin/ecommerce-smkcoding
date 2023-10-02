<script lang="ts" setup>
definePageMeta({
  middleware: ["user-access"]
});

import { productsStore } from "~/stores/products";

const useProductStore = productsStore();
const allProducts = ref<any>([]);

useProductStore.getAllProducts().then(() => {
  allProducts.value = useProductStore.products;
});

// const allProducts = ref(computed(() => {
//   if (selectedCategory.value) {
//     return products.filter((item) => item.category === selectedCategory.value);
//   }
//   return products;
// }));

const filterByCategory = async (event: string) => {
  if(event){
    await useProductStore.filterByCategory(event);
    if(useProductStore.status){
      allProducts.value = useProductStore.products;
    }else{
      allProducts.value = [];
    }
  }else{
    await useProductStore.getAllProducts();
    if(useProductStore.status){
      allProducts.value = useProductStore.products;
    }else{
      allProducts.value = [];
    }
  }
}
</script>

<template>
  <section>
    <div class="container">
      <div class="py-10">
        <div class="mb-6 flex justify-end gap-6">
          <NuxtLink to="/category/create" class="bg-orange-500 text-white flex justify-center items-center px-3 rounded-lg">
            Create Category
          </NuxtLink>
          <NuxtLink to="/product/create" class="bg-green-500 text-white flex justify-center items-center px-3 rounded-lg">
            Create Products
          </NuxtLink>
          <Dropdown @selected-category="filterByCategory" />
        </div>
        <template v-if="allProducts.length === 0">
          <h1 class="text-3xl text-center">Product is Empty</h1>
        </template>
        <div v-else class="flex gap-6 flex-wrap mx-auto">
          <template v-for="(item, index) in allProducts" :key="index">
            <CardsCardProduct :product="item" class="w-[calc(100%/4-18px)]"/>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>