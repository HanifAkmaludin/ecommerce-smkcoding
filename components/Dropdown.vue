<script lang="ts" setup>
import { category } from "~/composables/constants/category";

defineEmits(["selectedCategory"]);
</script>


<template>
<button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-600 hover:bg-blue-600/80 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">Category<svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
  </svg></button>
<!-- Dropdown menu -->
<div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-gray-700">
  <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
    <li>
      <span class="block px-4 py-2 hover:bg-gray-100/30 text-white" @click="$emit('selectedCategory', '')">All</span>
    </li>
    <li v-for="(item, index) in category" :key="index">
      <span class="block px-4 py-2 hover:bg-gray-100/30 text-white" @click="$emit('selectedCategory', item.name)">{{ item?.name }}</span>
    </li>
  </ul>
</div>
</template>