<template>
  <div class="bg-white shadow-xl p-6 rounded-xl flex gap-4 items-center">
    <div class="h-[150px] w-[130px] bg-gray-300 rounded-xl">
      <img src="~/assets/images/sepatu-1.png" class="h-full w-full object-contain" />
    </div>
    <div>
      <h5 class="text-xl font-semibold mb-2">Denim overshirt with pocket - Man | Mango Man Denmark</h5>
      <p class="text-lg font-light mb-3">$12.00</p>
      <div class="flex items-center justify-between">
        <div class="flex items-center border border-gray-300 w-max rounded-full">
          <div class="cursor-pointer py-1 pl-4 pr-2 text-lg flex items-center justify-center">-</div>
          <div class="py-1 px-2 text-lg flex items-center justify-center">1</div>
          <div class="cursor-pointer py-1 pl-2 pr-4 text-lg flex items-center justify-center">+</div>
        </div>
        <div class="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-full">
          <i class="ri-delete-bin-7-fill text-sm text-gray-600"></i>
          <span class="text-sm text-gray-500">Delete</span>
        </div>
      </div>
    </div>
  </div>
</template>