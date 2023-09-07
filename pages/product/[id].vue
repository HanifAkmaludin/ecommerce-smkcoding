<script lang="ts" setup>
import { products } from '~/composables/constants/products';

const splitPath = useRoute().path.split("/");
const id = parseInt(splitPath[splitPath.length - 1]);

const product = ref(products.find(item => item.id === id));
</script>

<template>
  <DetailProduct :product="product"/>
</template>