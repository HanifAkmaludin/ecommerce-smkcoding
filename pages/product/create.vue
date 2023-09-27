<script lang="ts" setup>
import { categoryStore } from '~/stores/category';
import { storageStore } from "~/stores/storage";
import { productsStore } from '#imports';
import { FormField } from '~/types/products';

const useCategoryStore = categoryStore();
const useStorageStore = storageStore();
const useProductStore = productsStore();
const isSuccess = ref(false);
const isShowAlert = ref(false);
const message = ref("");
const router = useRouter();
const isLoading = ref(false);

const categories = computed(() => useCategoryStore.category);
useCategoryStore.getAllCategory();

const formCreateProduct = [
  { name: "name", label: "Name", type: "text", value: "", placeholder: "Men's Streetwear", required: true },
  { name: "description", label: "Description", type: "text", value: "", placeholder: "This shirt features a vibrant and eye-catching color and a solid pattern that will give you a happy feeling...", required: true },
  { name: "price", label: "Price", type: "number", value: "", placeholder: "$30", required: true },
  { name: "image", label: "Image", type: "file", value: {}, placeholder: "", required: true },
  { name: "category", label: "Category", type: "select", value: "", placeholder: "", required: true },
];

const createProduct = async () => {
  isLoading.value = true;
  let file = formCreateProduct.find((item) => item.type === "file");
  file = await uploadFile(file?.value);
  const result: { [key: string]: any } = {};
  formCreateProduct.forEach((item: FormField) => {
    if(item.name){
      result[item.name] = item.value;
    }
  })
  result.image = file;
  await useProductStore.createProduct(result);
  if(!useProductStore.status){
    isSuccess.value = useProductStore.status;
    message.value = useProductStore.message;
    isShowAlert.value = true;
    isLoading.value = false;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }else{
    isSuccess.value = useProductStore.status;
    message.value = useProductStore.message;
    isShowAlert.value = true;
    isLoading.value = false;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      router.push({ path: "/product" });
    }, 1000);
  }
}

const uploadFile = async (formFile: any) => {
  const file = formFile?.target?.files[0];
  const payload = new FormData();
  payload.append("file", file);
  const pathname = `${Date.now().toString()}.${file.type.split("/")[1]}`;
  await useStorageStore.uploadFile(pathname, payload);
  if(useStorageStore.status){
    return useStorageStore.storage.Key;
  }
}
</script>



<template>
  <section class="flex justify-center py-10">
    <div class="w-[500px]">
      <h1 class="text-2xl mb-7 font-medium">Create Products</h1>
      <div v-if="isShowAlert" :class="`p-4 mb-4 text-sm rounded-lg ${isSuccess ? 'bg-green-100 text-green-800' : 'text-red-800 bg-red-100'}`" role="alert">
        {{ message }}
      </div>
      <form @submit.prevent="createProduct">
        <div class="mb-6" v-for="(item, index) in formCreateProduct" :key="index">
          <label
            :for="item.name"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            {{ item.label }}
          </label>
          <select
            v-if="item.type === 'select'"
            :id="item.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            v-model="item.value"
          >
            <option disabled value="">Choose Category</option>
            <option v-for="(category, index) in categories" :key="index" :value="category.name">{{ category.name }}</option>
          </select>
          <input
            v-else-if="item.type === 'file'"
            :type="item.type"
            :id="item.name"
            @change="item.value = $event"
            class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:bg-primary file:border-none file:px-3 file:py-2 file:text-white file:mr-3"
            :required="item.required"
          >
          <input
            v-else
            :type="item.type"
            :id="item.name"
            v-model="item.value"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            :placeholder="item.placeholder"
            :required="item.required"
          >
        </div>
        <button type="submit" class="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          <span v-if="!isLoading">Submit</span>
          <div v-else class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full border-2 border-t-blue-500 animate-spin"></div>
              <span>Loading</span>
          </div>
        </button>
      </form>
    </div>    
  </section>
</template>