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
          Masukkan email Anda untuk
        </h1>
        <h1 class="font-sans font-semibold sm:text-3xl text-2xl mb-6">
          mendaftar atau masuk.
        </h1>

        <!-- Form Input -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <input
              type="email"
              v-model="email"
              id="email"
              name="email"
              placeholder="Email*"
              class="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black font-sans"
              required
            />
          </div>

          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
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

          <div class="font-sans text-gray-500 mb-4">
            <h1 class="text-sm">
              Dengan melanjutkan, saya menyetujui Kebijakan
            </h1>
            <h1 class="text-sm">Privasi dan Ketentuan Penggunaan Nike.</h1>
          </div>

          <div>
            <button
              type="submit"
              class="w-full p-3 border bg-black text-white font-sans font-semibold rounded-2xl mt-2"
            >
              Sign In
            </button>
          </div>
        </form>
        <div>
          <button
            class="w-full p-3 border mt-4 border-gray-400 font-sans font-semibold text-black rounded-2xl"
          >
            <router-link to="/register">Sign Up</router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../components/Auth/libs/store";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const showPassword = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const handleLogin = async () => {
      try {
        const data = await authStore.login({
          email: email.value,
          password: password.value,
        });

        Swal.fire({
          title: "Login Berhasil!",
          text: "Selamat datang kembali!",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-black text-white",
          },
        }).then(() => {
          router.push("/");
        });

        console.log(data);
      } catch (err) {
        console.error("Login gagal:", err);

        Swal.fire({
          title: "Login Gagal",
          text: authStore.errorMessage || "Periksa kredensial Anda.",
          confirmButtonText: "Coba Lagi",
          customClass: {
            confirmButton: "bg-black text-white",
          },
        });
      }
    };

    return {
      email,
      password,
      showPassword,
      togglePasswordVisibility,
      handleLogin,
    };
  },
};
</script>
