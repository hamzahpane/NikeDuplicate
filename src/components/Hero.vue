<template>
  <div
    class="flex flex-col justify-center items-center mx-2 sm:mx-10 space-y-4"
  >
    <img
      src="../assets/Herossesions.png"
      alt="Hero Image"
      class="w-full max-w-screen-2xl h-auto object-cover mx-auto"
    />
    <div class="p-2 text-center max-w-full">
      <h1 class="text-sm sm:text-base font-sans font-semibold">Just In</h1>
      <h2 class="text-4xl sm:text-5xl md:text-7xl font-bold mt-2">
        NOTHING BEATS THE CITY
      </h2>
      <p class="text-sm sm:text-base font-sans font-normal mt-2">
        Built to overcome anything the city throws your way.
      </p>
      <button
        class="w-24 sm:w-32 p-2 mt-7 border rounded-full bg-black hover:bg-gray-400 transition-colors duration-300"
      >
        <h1 class="font-sans text-white">Shop</h1>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
};
</script>

<style scoped></style>
