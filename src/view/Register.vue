<template>
  <div class="mb-10"></div>
  <div>
    <div class="justify-center mt-2 items-center flex mx-auto">
      <div class="p-4">
        <div class="flex items-center mb-6">
          <img
            src="../assets/LogonikeHitam.png"
            alt="Logo Hitam"
            class="w-10 h-10 mr-2"
          />
          <h1 class="font-sans text-2xl font-semibold">Just do it</h1>
        </div>
        <h1 class="font-sans font-semibold text-2xl sm:text-3xl mb-2">
          Sekarang daftarkan diri Anda
        </h1>
        <h1 class="font-sans font-semibold text-2xl sm:text-3xl mb-6">
          menjadi Anggota Nike.
        </h1>

        <!-- Form Input -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <input
              v-model="username"
              type="text"
              id="username"
              name="username"
              placeholder="Username*"
              class="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black font-sans"
              required
            />
          </div>

          <div>
            <input
              v-model="email"
              type="email"
              id="email"
              name="email"
              placeholder="Email*"
              class="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black font-sans"
              required
            />
          </div>

          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              name="password"
              placeholder="Password*"
              class="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black font-sans"
              required
            />
            <!-- Icon mata untuk menunjukkan/menyembunyikan password -->
            <span
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            >
              <i
                :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                class="text-gray-500"
              ></i>
            </span>
          </div>

          <!-- Pesan Error -->
          <div v-if="error" class="text-red-500 text-sm mt-2">
            {{ error }}
          </div>

          <div class="font-sans text-gray-500 mb-4">
            <h1 class="text-sm">
              Dengan melanjutkan, saya menyetujui Kebijakan
            </h1>
            <h1 class="text-sm">Privasi dan Ketentuan Penggunaan Nike.</h1>
          </div>

          <div>
            <button
              type="submit"
              class="w-full p-3 bg-black text-white font-sans font-semibold rounded-2xl mt-2"
            >
              Buat Akun
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../components/Auth/libs/store.js";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      showPassword: false,
      error: null,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleRegister() {
      const authStore = useAuthStore();

      try {
        this.error = null;

        await authStore.register({
          username: this.username,
          email: this.email,
          password: this.password,
        });

        Swal.fire({
          title: "Registrasi Berhasil!",
          text: "Akun Anda telah dibuat. Silakan login.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-black text-white",
          },
        }).then(() => {
          this.$router.push({ name: "Login" });
        });
      } catch (error) {
        this.error =
          authStore.getErrorMessage || "Registrasi gagal, coba lagi.";

        Swal.fire({
          title: "Registrasi Gagal",
          text: this.error,
          icon: "error",
          confirmButtonText: "Coba Lagi",
          customClass: {
            confirmButton: "bg-black text-white",
          },
        });
      }
    },
  },
};
</script>
