<template>
  <div>
    <!-- Menampilkan produk jika tersedia -->
    <div
      v-if="filteredProducts.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
    >
      <div
        v-for="product in filteredProducts"
        :key="product._id"
        class="product-card bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
        @click="navigate(product._id)"
      >
        <img
          :src="`http://localhost:4000/images/productsWomen/${product.image_url}`"
          alt="Product Image"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2 text-gray-800 truncate">
            {{ product.name }}
          </h3>
          <p class="text-black font-semibold text-md">
            {{ product.price ? `Rp ${product.price},000` : "Not available" }}
          </p>
        </div>
      </div>
    </div>

    <p v-else class="text-center text-gray-500 mt-4">No products available.</p>
  </div>
</template>

<script>
import { useProductWomenStore } from "../../stores/useProductWomen";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "ProductWomen",
  setup() {
    const productWomenStore = useProductWomenStore();
    const router = useRouter();

    onMounted(() => {
      productWomenStore.fetchProductWomen();
    });

    // Mengakses produk yang sudah difilter
    const filteredProducts = computed(() => productWomenStore.filteredProducts);

    // Fungsi untuk navigasi menggunakan router.push
    const navigate = (id) => {
      router.push({ name: "womenPage", params: { id } });
    };

    return {
      filteredProducts,
      navigate, // Pastikan fungsi navigate dikembalikan ke template
    };
  },
};
</script>
