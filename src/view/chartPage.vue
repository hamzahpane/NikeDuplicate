<template>
  <div class="mb-10">
    <Navbar />
  </div>
  <h1 class="text-xl font-bold mt-20 font-sans mb-3 mx-8">My Chart</h1>
  <div class="border-t border-gray-400 my-3 mx-8"></div>
  <div class="p-4 mx-6">
    <!-- Form Address -->
    <div class="space-y-4">
      <div>
        <label for="kecamatan" class="block text-sm font-medium text-gray-700"
          >Kecamatan</label
        >
        <input
          type="text"
          id="kecamatan"
          v-model="address.kecamatan"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label for="kelurahan" class="block text-sm font-medium text-gray-700"
          >Kelurahan</label
        >
        <input
          type="text"
          id="kelurahan"
          v-model="address.kelurahan"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label for="kabupaten" class="block text-sm font-medium text-gray-700"
          >Kabupaten</label
        >
        <input
          type="text"
          id="kabupaten"
          v-model="address.kabupaten"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label for="alamat" class="block text-sm font-medium text-gray-700"
          >Alamat Lengkap</label
        >
        <textarea
          id="alamat"
          v-model="address.alamat"
          rows="3"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        ></textarea>
      </div>
    </div>

    <!-- Dropdown added here -->
    <Dropdown
      @update:selectedPayment="selectedPayment = $event"
      :selectedPayment="selectedPayment"
    />

    <!-- Card -->
    <div v-if="cart.length > 0" class="space-y-3">
      <CartCard
        v-for="item in cart"
        :key="item._id"
        :item="item"
        :increaseQuantity="increaseQuantity"
        :decreaseQuantity="decreaseQuantity"
        :removeFromCart="removeFromCart"
      />
      <div class="text-right mt-4">
        <h3 class="text-lg font-semibold">Total: Rp {{ cartTotal }},000</h3>
        <button
          @click="checkout"
          class="bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-600 text-sm"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-600 text-center">Your cart is empty.</p>
    </div>
  </div>
  <Footer />
</template>

<script>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import CartCard from "../components/cartPageComponets/cartCard.vue";
import Dropdown from "../components/cartPageComponets/dropdown.vue";
import { createOrder } from "../stores/api/order";

export default {
  name: "ChartPage",
  components: { Navbar, Footer, CartCard, Dropdown },
  setup() {
    const router = useRouter();
    const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);
    const saveCart = () => {
      localStorage.setItem("cart", JSON.stringify(cart.value));

      window.dispatchEvent(new Event("cart-updated"));
    };
    const selectedPayment = ref(null);
    console.log(selectedPayment);
    const address = ref({
      kecamatan: "",
      kelurahan: "",
      kabupaten: "",
      alamat: "",
    });

    const increaseQuantity = (item) => {
      const index = cart.value.findIndex(
        (cartItem) => cartItem._id === item._id
      );
      if (index !== -1) {
        cart.value[index].quantity += 1;
        saveCart();
      }
    };

    const decreaseQuantity = (item) => {
      const index = cart.value.findIndex(
        (cartItem) => cartItem._id === item._id
      );
      if (index !== -1 && cart.value[index].quantity > 1) {
        cart.value[index].quantity -= 1;
        saveCart();
      }
    };

    const removeFromCart = (item) => {
      const index = cart.value.findIndex(
        (cartItem) => cartItem._id === item._id
      );
      if (index !== -1) {
        cart.value.splice(index, 1);
        saveCart();
      }
    };

    const cartTotal = computed(() =>
      cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
    );

    const checkout = async () => {
      if (cart.value.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      if (
        !address.value.kecamatan ||
        !address.value.kelurahan ||
        !address.value.kabupaten ||
        !address.value.alamat
      ) {
        alert("Please fill in your delivery address.");
        return;
      }

      // Pastikan ID metode pembayaran sudah ada dan valid
      if (!selectedPayment.value) {
        alert("Please select a payment method.");
        return;
      }

      console.log("Selected Payment Method: ", selectedPayment.value); // Verifikasi ID metode pembayaran

      // Order data preparation
      const orderItems = cart.value.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const totalProductPrice = orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const deliveryFee = 0.5;
      const totalAmount = totalProductPrice + deliveryFee;

      const orderData = {
        orderItems: orderItems,
        deliveryAddress: address.value,
        deliveryFee: deliveryFee,
        totalProductPrice: totalProductPrice,
        totalAmount: totalAmount,
        payment: selectedPayment._value,
        orderDate: new Date().toISOString(),
      };
      console.log(orderData);

      try {
        const response = await createOrder(orderData);
        console.log("Order created successfully:", response);

        Swal.fire({
          title: "Success!",
          text: "Order created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          cart.value = [];
          saveCart();
          router.push("/order");
        });
      } catch (error) {
        console.error("Failed to create order:", error);
        Swal.fire("Error!", "Failed to create order.", "error");
      }
    };

    return {
      cart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      cartTotal,
      checkout,
      address,
      selectedPayment,
    };
  },
};
</script>

<style scoped></style>
