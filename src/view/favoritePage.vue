<template>
  <div>
    <Navbar />
    <h1 class="text-2xl font-bold mt-28 font-sans mb-4 mx-10">My Favorites</h1>
    <div class="border-t mt-2 border-gray-400 my-8 mx-8"></div>

    <!-- Check if there are any favorites -->
    <div v-if="favorites.length === 0" class="text-center text-gray-500 mt-10">
      <p>Your favorites are empty.</p>
    </div>

    <!-- Show favorites if available -->
    <div v-else class="grid grid-cols-1 md:grid-cols-1 gap-4 mx-10">
      <div
        v-for="favorite in favorites"
        :key="favorite._id"
        class="border p-4 rounded shadow flex flex-col sm:flex-row sm:items-center sm:gap-3"
      >
        <div
          class="w-full sm:w-80 h-32 bg-cover bg-center rounded mb-4 sm:mb-0"
          :style="{
            backgroundImage: `url(${favorite.image_url})`,
          }"
        ></div>

        <div>
          <h2 class="text-lg font-sans font-semibold">{{ favorite.name }}</h2>
          <p class="text-gray-600">{{ favorite.description }}</p>
          <p class="font-bold mb-2">Rp {{ favorite.price }},000</p>
          <p class="text-base font-semibold font-sans mb-4">
            Size: {{ favorite.size }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <AddToBagButton :product="product" />

            <button
              class="bg-gray-300 font-sans mb-3 text-black px-32 py-2 rounded-xl shadow focus:outline-none"
              @click="removeFromFavorites(favorite._id)"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import AddToBagButton from "../components/button/AddToBagButton.vue";

export default {
  name: "FavoritePage",
  components: {
    Navbar,
    Footer,
    AddToBagButton,
  },
  setup() {
    const favorites = ref([]);

    onMounted(async () => {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

      for (const favorite of storedFavorites) {
        if (!favorite.image_url.includes("http")) {
          favorite.image_url = await getValidImageUrl(favorite.image_url);
        }
      }

      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      favorites.value = storedFavorites;
    });

    const removeFromFavorites = (id) => {
      favorites.value = favorites.value.filter((item) => item._id !== id);
      localStorage.setItem("favorites", JSON.stringify(favorites.value));
      alert("Product removed from favorites!");
    };

    const getValidImageUrl = async (imageUrl) => {
      const baseUrl1 = `http://localhost:4000/images/products/${imageUrl}`;
      const baseUrl2 = `http://localhost:4000/${imageUrl}`;
      const baseUrl3 = `http://localhost:4000/images/productsWomen/${imageUrl}`;
      const fallbackUrl = "https://via.placeholder.com/200x200";

      // Check image at baseUrl1
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
    };

    return { favorites, removeFromFavorites };
  },
};
</script>
