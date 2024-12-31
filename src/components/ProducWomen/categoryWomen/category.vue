<template>
  <div>
    <div class="mx-1 mt-2 p-2">
      <h1 class="font-sans text-xl font-semibold">Women Shoess</h1>
    </div>
    <div class="flex flex-col sm:flex-row">
      <!-- Sidebar -->
      <div class="w-full sm:w-64">
        <!-- Sidebar di atas untuk smartphone dan di samping untuk layar besar -->
        <SidebarWomen />
      </div>
      <!-- Product Cards Section -->
      <div class="w-full sm:w-full grid gap-4 p-4">
        <ProductWomen />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../../Footer.vue";
import ProductWomen from "../productWomen.vue";
import SidebarWomen from "./sidebarWomen.vue";
export default {
  name: "categoryWomen",
  components: {
    SidebarWomen,
    Footer,
    ProductWomen,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
