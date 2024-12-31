<template>
  <div class="mt-5 ml-4">
    <!-- Categories List -->
    <div class="border-b border-gray-300 pb-4">
      <div class="overflow-x-auto sm:overflow-x-visible">
        <ul
          class="flex space-x-4 sm:block sm:space-x-0 sm:space-y-2 sm:flex-nowrap"
        >
          <!-- Loop through categories from the store -->
          <li v-for="category in categoryMan" :key="category._id">
            <a
              href="#"
              @click.prevent="filterByCategory(category._id)"
              class="font-sans text-black hover:underline"
            >
              {{ category.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Size Dropdown Section -->
    <div class="border-t border-gray-300 pt-4 mt-4">
      <button
        @click="toggleSizeDropdown"
        class="flex justify-between items-center w-full text-black font-semibold text-lg"
      >
        Size
        <span
          :class="{ 'rotate-180': isSizeDropdownOpen }"
          class="transition-transform"
          >\u25BC</span
        >
      </button>
      <div v-if="isSizeDropdownOpen" class="grid grid-cols-3 gap-2 mt-2">
        <button
          v-for="size in sizes"
          :key="size"
          @click="selectSize(size)"
          :class="{
            'border border-black': selectedSize === size,
            'border border-gray-300': selectedSize !== size,
          }"
          class="p-2 rounded-md text-center hover:bg-gray-200 text-xs"
        >
          {{ size }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductManStore } from "../../../stores/useProductMan";
import { computed, onMounted } from "vue";

export default {
  name: "Categories",
  setup() {
    const productManStore = useProductManStore();

    // Fetch categories when the component is mounted
    onMounted(() => {
      productManStore.fetchCetegoryMan();
    });

    // Computed property to access categories
    const categoryMan = computed(() => productManStore.categoryMan);

    const filterByCategory = (categoryId) => {
      productManStore.fetchProductMan(categoryId); // Pass categoryId to fetch products for the specific category
    };

    return {
      categoryMan,
      filterByCategory,
    };
  },
  data() {
    return {
      isSizeDropdownOpen: false,
      isPriceDropdownOpen: false,
      selectedSize: null,

      sizes: [
        35, 35.5, 36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44,
      ],
    };
  },
  methods: {
    toggleSizeDropdown() {
      this.isSizeDropdownOpen = !this.isSizeDropdownOpen;
    },
    selectSize(size) {
      this.selectedSize = size;
    },
  },
};
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}

/* Responsive styles */
@media (max-width: 640px) {
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }
}

@media (min-width: 641px) {
  .overflow-x-auto {
    overflow-x: visible;
  }
}
</style>
