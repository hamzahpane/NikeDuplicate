<template>
  <div>
    <Titlee />
    <div class="flex flex-col sm:flex-row">
      <!-- Menambahkan flex-col untuk tampilan vertikal pada smartphone -->
      <!-- Sidebar -->
      <div class="w-full sm:w-64">
        <!-- Sidebar di atas untuk smartphone dan di samping untuk layar besar -->
        <sidbar />
      </div>
      <!-- Product Cards Section -->
      <div class="w-full sm:w-full grid gap-4 p-4">
        <ProdcutMan />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Titlee from "./libs/Titlee.vue";
import sidbar from "./libs/sidbar.vue";
import Footer from "../Footer.vue";
import ProdcutMan from "../Product/libs/prodcutMan.vue";

export default {
  name: "category",
  components: {
    Titlee,
    sidbar,
    Footer,
    ProdcutMan,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
