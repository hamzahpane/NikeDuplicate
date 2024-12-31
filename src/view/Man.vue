<template>
  <div>
    <div>
      <Navbar />
    </div>
    <InfromText />
    <category />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import InfromText from "../components/InfromText.vue";
import category from "../components/Category/category.vue";

export default {
  components: {
    Navbar,
    InfromText,
    category,
  },
};
</script>

<style lang="scss" scoped></style>
