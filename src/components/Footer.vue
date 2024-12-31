<template>
  <div>
    <!-- Line Underneath -->
    <div class="border-t mt-10 border-gray-400 my-8 mx-8"></div>

    <!-- Footer -->
    <footer class="bg-white text-gray-500 py-12">
      <div
        class="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <!-- Resources Column -->
        <div>
          <h3 class="font-semibold font-sans text-black text-lg mb-4">
            Resources
          </h3>
          <ul>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >Find A Store</a
              >
            </li>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >Become A Member</a
              >
            </li>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >Education Discounts</a
              >
            </li>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >Send Us Feedback</a
              >
            </li>
          </ul>
        </div>

        <!-- Help Column -->
        <div>
          <h3 class="font-semibold font-sans text-black text-lg mb-4">Help</h3>
          <ul>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >Get Help</a
              >
            </li>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >Order Status</a
              >
            </li>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >Delivery</a
              >
            </li>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >Returns</a
              >
            </li>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >Payment Options</a
              >
            </li>
          </ul>
        </div>

        <!-- Contact Us Column -->
        <div>
          <h3 class="font-semibold font-sans text-black text-lg mb-4">
            Contact Us
          </h3>
          <ul>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >Contact Info</a
              >
            </li>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >Customer Support</a
              >
            </li>
          </ul>
        </div>

        <!-- Company Column -->
        <div>
          <h3 class="font-semibold font-sans text-black text-lg mb-4">
            Company
          </h3>
          <ul>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >About Nike</a
              >
            </li>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >News</a
              >
            </li>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >Careers</a
              >
            </li>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >Investors</a
              >
            </li>
            <li>
              <a
                href="#"
                class="font-sans font-semibold text-base hover:text-gray-400"
                >Sustainability</a
              >
            </li>
          </ul>
        </div>
      </div>
    </footer>

    <!-- Copyright -->
    <div class="bg-white text-center text-black py-4">
      <p class="font-sans font-semibold text-base">© 2024 Nike, Duplicate</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  // Add any logic if needed
};
</script>

<style scoped>
/* Additional styling if needed */

footer a {
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
}

footer a:hover {
  color: #4b5563; /* Gray-400 */
}
</style>
