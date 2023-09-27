<script lang="ts" setup>
import { products } from '~/composables/constants/products';
import { productsStore } from '~/stores/products';

const useProductStore = productsStore();
const splitPath = useRoute().path.split("/");
const id = parseInt(splitPath[splitPath.length - 1]);
const product = ref([]);

useProductStore.detailProduct(id).then(() => {
  product.value = useProductStore.oneProduct;
})
</script>

<template>
  <DetailProduct :product="product[0]"/>
</template>