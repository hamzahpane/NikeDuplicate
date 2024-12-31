<template>
  <div>
    <!-- Menggunakan kelas shadow-lg dari Tailwind untuk bayangan yang lebih tegas -->
    <div>
      <Navbar />
    </div>
    <div>
      <InfromText />
      <Hero />
      <Featured />
      <NewShow />
      <Classics />
      <Footer />
    </div>
  </div>
</template>

<script>
import Classics from "../components/Classics.vue";
import Hero from "../components/Hero.vue";
import InfromText from "../components/InfromText.vue";
import Navbar from "../components/Navbar.vue";
import NewShow from "../components/NewShow.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Navbar,
    InfromText,
    Hero,
    Classics,
    NewShow,
    Footer,
  },
};
</script>

<style lang="scss" scoped></style>
