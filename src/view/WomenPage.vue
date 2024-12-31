<template>
  <div>
    <Navbar />

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
                ? `http://localhost:4000/images/productsWomen/${product.image_url}`
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
            {{ product.price ? `Rp ${product.price},000` : "Not available" }}
          </p>
          <p class="text-base font-semibold font-sans">
            Size: {{ product.size }}
          </p>
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
          <div class="mt-5">
            <AddToBagButton :product="product" />
            <AddFavoriteButton :product="product" />
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useProductWomenStore } from "../stores/useProductWomen";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import AddToBagButton from "../components/button/AddToBagButton.vue";
import AddFavoriteButton from "../components/button/AddFavoriteButton.vue";

export default {
  components: { Navbar, Footer, AddToBagButton, AddFavoriteButton },
  name: "ProductDetail",
  props: ["id"],
  setup(props) {
    const productStore = useProductWomenStore();
    const product = ref(null);

    onMounted(async () => {
      product.value = await productStore.fetchProductById(props.id);
    });

    const addToFavorites = () => {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!favorites.some((fav) => fav._id === product.value._id)) {
        favorites.push(product.value);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Product added to favorites!");
      } else {
        alert("Product is already in favorites!");
      }
    };

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

/* Custom Styles for Product Details */
.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.product-details {
  text-align: center;
  margin-top: 20px;
}

.product-rating i {
  margin-right: 5px;
}
</style>
