<template>
  <div>
    <div class="px-4 sm:mx-0 sm:px-0 mb-6 mt-8 relative">
      <h1 class="font-sans text-2xl sm:mx-12 sm:text-2xl font-semibold">
        Classics Spotlight
      </h1>

      <!-- Loading & Error Messages -->
      <div v-if="classicStore.isLoading" class="text-center mt-4">
        <p>Loading products...</p>
      </div>
      <div v-if="classicStore.error" class="text-center mt-4 text-red-500">
        <p>{{ classicStore.error }}</p>
      </div>

      <!-- Cards Container -->
      <div
        v-else
        ref="cardContainer"
        class="overflow-x-auto px-2 mt-3 scrollbar-hide"
      >
        <div class="flex flex-nowrap space-x-4 mb-2">
          <div
            v-for="(product, index) in classicStore.productClasic"
            :key="product.id || index"
            class="w-[300px] h-[300px] bg-white overflow-hidden relative flex-shrink-0 cursor-pointer"
            @click="
              $router.push({
                name: 'ClassicDetail',
                params: { id: product._id },
              })
            "
          >
            <!-- Card Image -->
            <div
              class="h-2/3 bg-cover bg-center"
              :style="{
                backgroundImage: `url(${
                  product.image_url
                    ? `${main}/${product.image_url}`
                    : 'https://via.placeholder.com/300x200'
                })`,
              }"
            ></div>
            <!-- Card Content -->
            <div class="p-2">
              <h2 class="font-semibold text-lg text-center">
                {{ product.name }}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <!-- Arrow Button Container -->
      <div
        v-if="classicStore.productClasic.length > 0"
        class="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2"
      >
        <!-- Left Arrow Button -->
        <button
          @click="scrollLeft"
          class="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
        >
          <span class="text-gray-500 text-lg">‹</span>
        </button>

        <!-- Right Arrow Button -->
        <button
          @click="scrollRight"
          class="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
        >
          <span class="text-gray-500 text-lg">›</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useClassicStore } from "../stores/useClasicStore";
import { main } from "../config";

export default {
  name: "Classics",
  setup() {
    const classicStore = useClassicStore();
    console.log(classicStore);
    // Fetch data saat komponen di-mount
    classicStore.fecthProductClasic();

    return {
      classicStore,
      main,
    };
  },
  methods: {
    scrollLeft() {
      this.$refs.cardContainer.scrollBy({ left: -300, behavior: "smooth" });
    },
    scrollRight() {
      this.$refs.cardContainer.scrollBy({ left: 300, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
/* Hide horizontal scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
