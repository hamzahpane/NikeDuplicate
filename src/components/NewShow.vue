<template>
  <div>
    <div class="px-4 sm:mx-3 sm:px-8 mb-6 mt-8">
      <div class="relative flex items-center justify-between">
        <!-- Title on the Left -->
        <h1 class="font-sans text-2xl mb-4 sm:text-2xl font-semibold">
          New Arrivals Just Landed
        </h1>

        <!-- Right Side: Shop Text and Arrow Buttons -->
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-lg">Shop</span>
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

      <!-- Cards Container with mouse enter and leave events -->
      <div
        ref="cardContainer"
        class="overflow-x-auto px-2 -ml-1 scrollbar-hidden"
        @mouseenter="showScrollbar"
        @mouseleave="hideScrollbar"
      >
        <div
          class="flex flex-nowrap justify-start sm:justify-between space-x-4 -ml-3"
        >
          <div
            v-for="(product, index) in futureStore.productFuture"
            :key="product.id || index"
            class="w-[300px] h-[400px] bg-white overflow-hidden m-2 relative inline-block flex-shrink-0 cursor-pointer"
            @click="
              $router.push({
                name: 'FutureDetail',
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
            <div class="p-4">
              <h2 class="font-semibold text-center text-base">
                {{ product.name }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useFutureStore } from "../stores/useFutureStore";
import { main } from "../config";
export default {
  name: "NewShow",
  setup() {
    const futureStore = useFutureStore();

    futureStore.fetchProductFuture();

    return {
      futureStore,
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
    showScrollbar() {
      // Add class to make the scrollbar visible
      this.$refs.cardContainer.classList.remove("scrollbar-hidden");
    },
    hideScrollbar() {
      // Add class to hide the scrollbar
      this.$refs.cardContainer.classList.add("scrollbar-hidden");
    },
  },
};
</script>

<style scoped>
/* Initially hide the horizontal scrollbar */
.scrollbar-hidden {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Optional: Add smooth transition for showing the scrollbar */
.scrollbar-hidden {
  transition: scrollbar-width 0.3s ease;
}
</style>
