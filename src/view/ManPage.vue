<template>
  <div>
    <div>
      <Navbar />
    </div>

    <div class="p-4 flex justify-center items-center min-h-screen mx-10">
      <div
        v-if="product"
        class="flex justify-center flex-col md:flex-row items-center gap-5"
      >
        <div
          class="w-[300px] h-[300px] bg-contain bg-no-repeat bg-center border rounded shadow-md"
          :style="{
            backgroundImage: `url(${
              product.image_url
                ? `http://localhost:4000/images/products/${product.image_url}`
                : 'https://via.placeholder.com/200x200'
            })`,
          }"
        ></div>

        <div class="w-full md:w-1/2 text-center md:text-left">
          <h2 class="text-xl font-bold font-sans mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 font-sans mb-4">
            {{ product.description || "No description available" }}
          </p>
          <p class="text-base font-semibold font-sans">
            Price:
            {{ product.price ? ` Rp ${product.price},000` : "Not available" }}
          </p>
          <p class="text-base font-semibold font-sans">
            Size: {{ product.size }}
          </p>

          <div class="mt-5">
            <AddToBagButton :product="product" />

            <AddFavoriteButton :product="product" />
          </div>
        </div>
      </div>
    </div>

    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useProductManStore } from "../stores/useProductMan";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import AddToBagButton from "../components/button/AddToBagButton.vue";
import AddFavoriteButton from "../components/button/AddFavoriteButton.vue";

export default {
  components: { Navbar, Footer, AddToBagButton, AddFavoriteButton },
  name: "ProductDetail",
  props: ["id"],
  setup(props) {
    const productStore = useProductManStore();
    const product = ref(null);

    onMounted(async () => {
      product.value = await productStore.fetchManById(props.id);
    });

    return {
      product,
    };
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .min-h-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .flex.md\\:flex-row {
    flex-direction: column !important;
  }

  .w-full.md\:w-1\/2 {
    width: 100% !important;
  }

  button {
    width: 100%;
    padding: 10px;
  }

  .mx-10 {
    margin: 0;
  }
}

/* Button adjustments */
button {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:focus {
  outline: none;
  border: 2px solid #000;
}

.fas.fa-heart {
  color: black;
}
</style>
