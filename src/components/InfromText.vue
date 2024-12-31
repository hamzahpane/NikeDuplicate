<template>
  <div class="mt-16 h-14 justify-center w-full m-auto bg-gray-50">
    <div class="text-center p-1">
      <h1 class="mt-3 font-sans font-semibold">{{ currentMessage }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "InformText",
  data() {
    return {
      messages: [
        "Free Standard Delivery & 30-Day Free Returns",
        "Up to 50% off on selected items!",
        "Sign up for exclusive deals and discounts!",
      ],
      currentMessageIndex: 0,
      currentMessage: "Free Standard Delivery & 30-Day Free Returns",
    };
  },
  mounted() {
    this.startMessageRotation();
  },
  methods: {
    startMessageRotation() {
      setInterval(() => {
        this.currentMessageIndex =
          (this.currentMessageIndex + 1) % this.messages.length;
        this.currentMessage = this.messages[this.currentMessageIndex];
      }, 5000); // Ganti setiap 5 detik
    },
  },
};
</script>

<style lang="scss" scoped></style>
