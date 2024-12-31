<template>
  <div>
    <div>
      <Navbar />
    </div>
    <InfromText />
    <Category />
  </div>
</template>

<script>
import InfromText from "../components/InfromText.vue";
import Navbar from "../components/Navbar.vue";
import Category from "../components/ProducWomen/categoryWomen/category.vue";

export default {
  components: {
    Navbar,
    InfromText,
    Category,
  },
};
</script>

<style lang="scss" scoped></style>
