<template>
  <div
    class="flex justify-between items-center p-3 border border-gray-300 rounded-lg shadow-sm"
  >
    <div class="flex items-center space-x-4">
      <div
        class="w-20 h-20 bg-cover bg-center rounded-lg"
        :style="{ backgroundImage: `url(${validatedImageUrl})` }"
      ></div>
      <div>
        <h2 class="font-semibold text-base">{{ item.name }}</h2>
        <p class="text-gray-600 text-sm">Price: Rp {{ item.price }},000</p>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <button
        @click="decreaseQuantity(item)"
        class="px-2 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 text-sm"
      >
        -
      </button>
      <span class="font-medium">{{ item.quantity }}</span>
      <button
        @click="increaseQuantity(item)"
        class="px-2 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 text-sm"
      >
        +
      </button>
      <button
        @click="removeFromCart(item)"
        class="text-red-500 hover:text-red-700 font-semibold text-sm"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartCard",
  props: {
    item: Object,
    increaseQuantity: Function,
    decreaseQuantity: Function,
    removeFromCart: Function,
  },
  data() {
    return {
      validatedImageUrl: "",
    };
  },
  async mounted() {
    this.validatedImageUrl = await this.getValidImageUrl(this.item.image_url);
  },
  methods: {
    async getValidImageUrl(imageUrl) {
      const baseUrl1 = `http://localhost:4000/images/products/${imageUrl}`;
      const baseUrl2 = `http://localhost:4000/${imageUrl}`;
      const baseUrl3 = `http://localhost:4000/images/productsWomen/${imageUrl}`;
      const fallbackUrl = "https://via.placeholder.com/200x200";

      const img1 = new Image();
      img1.src = baseUrl1;
      const imageLoaded1 = await new Promise((resolve) => {
        img1.onload = () => resolve(true);
        img1.onerror = () => resolve(false);
      });

      if (imageLoaded1) return baseUrl1;

      const img2 = new Image();
      img2.src = baseUrl2;
      const imageLoaded2 = await new Promise((resolve) => {
        img2.onload = () => resolve(true);
        img2.onerror = () => resolve(false);
      });

      if (imageLoaded2) return baseUrl2;

      const img3 = new Image();
      img3.src = baseUrl3;
      const imageLoaded3 = await new Promise((resolve) => {
        img3.onload = () => resolve(true);
        img3.onerror = () => resolve(false);
      });

      if (imageLoaded3) return baseUrl3;

      return fallbackUrl;
    },
  },
};
</script>

<style scoped></style>
