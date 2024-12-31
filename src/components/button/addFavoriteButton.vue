<template>
  <button
    class="text-black border border-grey px-32 py-2 rounded-xl shadow-md focus:outline-none flex items-center justify-center"
    @click="handleAddToFavorites"
  >
    Favorite
    <i class="fas fa-heart ml-2"></i>
  </button>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "AddFavoriteButton",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleAddToFavorites() {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const isAlreadyFavorite = favorites.some(
        (fav) => fav._id === this.product._id
      );

      if (!isAlreadyFavorite) {
        // Add product to favorites
        favorites.push(this.product);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        // Show SweetAlert2 notification with custom button style
        Swal.fire({
          title: "Success!",
          text: "Product added to favorites!",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Go to Favorites",
          cancelButtonText: "Stay Here",
          customClass: {
            confirmButton: "bg-black text-white", // Black background for the "Go to Favorites" button
            cancelButton: "bg-gray-300 text-black", // Optional: Style for the cancel button
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to favorites page
            this.$router.push({ name: "FavoritePage" });
          }
        });
      } else {
        // Show SweetAlert2 notification for duplicate favorite
        Swal.fire({
          title: "Oops!",
          text: "Product is already in favorites!",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    },
  },
};
</script>

<style scoped>
.fas.fa-heart {
  color: black;
}
</style>
