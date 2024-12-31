<template>
  <div>
    <!-- Navbar -->
    <div>
      <Navbar />
    </div>

    <!-- Product Details Section -->
    <div class="p-4 flex justify-center items-center min-h-screen mx-10">
      <div
        v-if="product"
        class="flex justify-center flex-col md:flex-row items-center gap-5"
      >
        <!-- Product Image -->
        <div
          class="w-[300px] h-[300px] bg-contain bg-no-repeat bg-center border rounded shadow-md"
          :style="{
            backgroundImage: `url(${
              product.image_url
                ? `${main}/${product.image_url}`
                : 'https://via.placeholder.com/200x200'
            })`,
          }"
        ></div>

        <!-- Product Details -->
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

          <!-- Rating Section -->
          <div class="flex items-center mt-3">
            <span class="text-base text-center font-semibold font-sans mr-2">
              Rating:
            </span>
            <div class="flex items-center">
              <span v-for="star in 5" :key="star" class="text-black text-base">
                <i
                  class="fas"
                  :class="{
                    'fa-star': star <= Math.floor(product.rating),
                    'fa-star-half-alt':
                      star === Math.ceil(product.rating) &&
                      !Number.isInteger(product.rating),
                    'fa-star-o': star > product.rating,
                  }"
                ></i>
              </span>
              <span class="ml-2 text-gray-600">({{ product.rating }})</span>
            </div>
          </div>

          <!-- Buttons Section -->
          <div class="mt-5">
            <AddToBagButton :product="product" />
            <AddFavoriteButton :product="product" />
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useClassicStore } from "../stores/useClasicStore";
import { main } from "../config";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import AddToBagButton from "../components/button/AddToBagButton.vue";
import AddFavoriteButton from "../components/button/AddFavoriteButton.vue";

export default {
  components: { Navbar, Footer, AddToBagButton, AddFavoriteButton },
  name: "ClassicPage",
  props: ["id"],
  setup(props) {
    const classicStore = useClassicStore();
    let product = ref(null);

    // Fetch product detail jika tidak ada di store
    onMounted(async () => {
      product.value = await classicStore.fetchProductById(props.id);
      console.log(product.value);
    });

    return {
      product,
      main,
    };
  },
};
</script>

<style scoped>
/* Styling detail page */
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
    width: 100%; /* Full width for buttons on mobile */
    padding: 10px;
  }

  .mx-10 {
    margin: 0; /* Remove horizontal margins on smaller screens */
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
</style>
