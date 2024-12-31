<template>
  <div class="mt-5 ml-4">
    <!-- Daftar Kategori -->
    <div class="border-b border-gray-300 pb-4">
      <div class="overflow-x-auto sm:overflow-x-visible">
        <ul
          class="flex space-x-4 sm:block sm:space-x-0 sm:space-y-2 sm:flex-nowrap"
        >
          <li v-for="category in categoryWomen" :key="category._id">
            <a
              href="#"
              @click.prevent="selectCategory(category._id)"
              class="font-sans text-black hover:underline"
            >
              {{ category.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Dropdown Ukuran -->
    <div class="border-t border-gray-300 pt-4 mt-4">
      <button
        @click="toggleSizeDropdown"
        class="flex justify-between items-center w-full text-black font-semibold text-lg"
      >
        Ukuran
        <span
          :class="{ 'rotate-180': isSizeDropdownOpen }"
          class="transition-transform"
          >\u25BC</span
        >
      </button>
      <div v-if="isSizeDropdownOpen" class="grid grid-cols-3 gap-2 mt-2">
        <button
          v-for="size in sizeWomen"
          :key="size._id"
          @click="selectSize(size)"
          :class="{
            'border border-black': selectedSize === size,
            'border border-gray-300': selectedSize !== size,
          }"
          class="p-2 rounded-md text-center hover:bg-gray-200 text-xs text-black"
        >
          {{ size.value }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductWomenStore } from "../../../stores/useProductWomen";
import { computed, onMounted } from "vue";

export default {
  name: "Categories",
  setup() {
    const productWomenStore = useProductWomenStore();

    onMounted(() => {
      productWomenStore.fetchCategoryWomen();
      productWomenStore.fetchSizeWomen();
    });

    const categoryWomen = computed(() => productWomenStore.categoryWomen);
    const sizeWomen = computed(() => productWomenStore.sizeWomen);

    const selectCategory = (categoryId) => {
      productWomenStore.selectCategory(categoryId); // Filter hanya berdasarkan kategori
    };

    const selectSize = (size) => {
      productWomenStore.selectSize(size._id); // Filter hanya berdasarkan ukuran
    };

    const toggleSizeDropdown = () => {
      this.isSizeDropdownOpen = !this.isSizeDropdownOpen;
    };

    return {
      categoryWomen,
      selectCategory,
      sizeWomen,
      toggleSizeDropdown,
      selectSize,
    };
  },
  data() {
    return {
      isSizeDropdownOpen: false,
      selectedSize: null,
    };
  },
  methods: {
    toggleSizeDropdown() {
      this.isSizeDropdownOpen = !this.isSizeDropdownOpen;
    },
  },
};
</script>
