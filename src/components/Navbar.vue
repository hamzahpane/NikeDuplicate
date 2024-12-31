<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      { 'bg-black text-white': isScrolled, 'bg-white text-black': !isScrolled },
    ]"
  >
    <nav class="container mx-auto p-4 flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <img
          src="../assets/LogonikeHitam.png"
          alt="Logo Hitam"
          class="w-8 h-8 transition-all duration-300"
          v-show="!isScrolled"
        />

        <img
          src="../assets/LogoNike_Putih.png"
          alt="Logo Putih"
          class="w-7 h-7 transition-all duration-300"
          v-show="isScrolled"
        />
      </div>

      <ul class="hidden ml-32 md:flex flex-grow justify-center space-x-10">
        <li><router-link to="/" :class="menuLinkClasses">Home</router-link></li>
        <li>
          <router-link to="/man" :class="menuLinkClasses">Men</router-link>
        </li>
        <li>
          <router-link to="/women" :class="menuLinkClasses">Women</router-link>
        </li>

        <li>
          <router-link to="/order" :class="menuLinkClasses"
            >Orders
          </router-link>
        </li>
      </ul>

      <div class="flex items-center space-x-4">
        <button
          class="w-6 h-6 p-4 flex items-center justify-center group hover:bg-gray-200 hover:rounded-full"
        >
          <router-link to="/favorite">
            <i class="fa-regular fa-heart group-hover:text-black"></i>
          </router-link>
        </button>
        <button
          @click="handlecartClick"
          class="w-6 h-6 p-4 flex items-center justify-center group hover:bg-gray-200 hover:rounded-full relative"
        >
          <i class="fa fa-shopping-cart group-hover:text-black"></i>
          <span
            v-if="cartCount > 0"
            class="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
          >
            {{ cartCount }}
          </span>
        </button>

        <button
          v-if="!authStore.isAuthenticated"
          :class="['px-1 font-sans font-semibold border-b-2', buttonClass]"
        >
          <router-link to="/login">Sign In</router-link>
        </button>
        <button
          v-else
          @click="handleLogout"
          :class="['px-1 font-sans font-semibold border-b-2', buttonClass]"
        >
          Logout
        </button>

        <button class="block md:hidden" @click="toggleMenu">
          <i v-if="!isMenuOpen" class="fa-solid fa-bars w-6 h-6"></i>
          <i v-else class="fa-solid fa-xmark w-6 h-6"></i>
        </button>
      </div>
    </nav>
  </header>

  <ul
    v-if="isMenuOpen"
    class="fixed inset-0 z-40 top-16 w-full bg-black text-white md:hidden"
  >
    <li class="py-2">
      <router-link to="/" class="block px-4 font-sans hover:bg-gray-700"
        >Home</router-link
      >
    </li>
    <li class="py-2">
      <router-link to="/man" class="block px-4 font-sans hover:bg-gray-700"
        >Men</router-link
      >
    </li>
    <li class="py-2">
      <router-link to="/Women" class="block px-4 font-sans hover:bg-gray-700"
        >Men</router-link
      >
    </li>
    <li class="py-2">
      <a href="#" class="block px-4 font-sans hover:bg-gray-700">Kids</a>
    </li>
    <li class="py-2">
      <a href="#" class="block px-4 font-sans hover:bg-gray-700">SNKRS</a>
    </li>
  </ul>
</template>

<script>
import { useAuthStore } from "../components/Auth/libs/store";
import Swal from "sweetalert2";

export default {
  name: "Navbar",
  data() {
    return {
      isScrolled: false,
      isMenuOpen: false,
      cartCount: 0,
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
    menuLinkClasses() {
      return [
        "hover:border-b-2 font-sans font-semibold transition-colors duration-300",
        this.isScrolled
          ? "hover:text-white hover:border-white"
          : "hover:text-black hover:border-black",
      ];
    },
    buttonClass() {
      return this.isScrolled
        ? "text-white border-white"
        : "text-black border-black";
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    },
    handleLogout() {
      this.authStore.logout();
      this.$router.push("/");
      Swal.fire({
        title: "Logout Berhasil",
        text: "Anda telah logout.",
        confirmButtonText: "OK",
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          confirmButton: "bg-black text-white",
        },
      });
    },
    handlecartClick() {
      if (!this.authStore.isAuthenticated) {
        Swal.fire({
          title: "Akses Ditolak",
          text: "Anda harus login untuk melanjutkan.",
          showCancelButton: true,
          confirmButtonText: "Login Sekarang",
          cancelButtonText: "Batal",
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            confirmButton: "bg-black text-white",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push("/login");
          }
        });
      } else {
        this.$router.push("/chart");
      }
    },
    updateCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.isScrolled = window.scrollY > 50;
    });
    this.updateCartCount();
    // Dengarkan event pembaruan cart
    window.addEventListener("cart-updated", this.updateCartCount);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", () => {
      this.isScrolled = window.scrollY > 50;
    });
    window.removeEventListener("cart-updated", this.updateCartCount);
  },
};
</script>

<style scoped>
/* Menonaktifkan scroll pada body ketika mobile menu terbuka */
.no-scroll {
  overflow: hidden;
}
</style>
