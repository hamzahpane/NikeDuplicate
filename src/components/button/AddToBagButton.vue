<template>
  <button
    class="bg-black font-sans mb-3 text-white px-32 py-2 rounded-xl shadow focus:outline-none"
    @click="addToBag"
  >
    Add to Bag
  </button>
</template>

<script>
import { useRouter } from "vue-router";
import Swal from "sweetalert2"; // Import SweetAlert2

export default {
  name: "AddToBagButton",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const addToBag = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        Swal.fire({
          title: "Akses Ditolak",
          text: "Anda harus login untuk melanjutkan.",
          showCancelButton: true,
          confirmButtonText: "Login Sekarang",
          cancelButtonText: "Batal",
          customClass: {
            confirmButton: "bg-black text-white",
            cancelButton: "bg-gray-200 text-black",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login"); // Redirect to login page
          }
        });
      } else {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find(
          (item) => item._id === props.product._id
        );

        if (!existingProduct) {
          cart.push({ ...props.product, quantity: 1 });
          localStorage.setItem("cart", JSON.stringify(cart));
          Swal.fire({
            title: "Success",
            text: "Product added to the cart!",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "bg-black text-white",
            },
          });
        } else {
          existingProduct.quantity += 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          Swal.fire({
            title: "Updated",
            text: "Product quantity updated!",
            icon: "info",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "bg-black text-white",
            },
          });
        }

        router.push("/chart"); // Navigate to cart page
      }
    };

    return { addToBag };
  },
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
