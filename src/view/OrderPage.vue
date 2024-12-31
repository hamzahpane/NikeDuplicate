<template>
  <div>
    <Navbar />
    <div class="mt-10">
      <h1 class="text-xl font-bold mt-20 font-sans mb-3 mx-8">List Order</h1>
      <div class="border-t border-gray-400 my-3 mx-8"></div>

      <div v-if="orders.length === 0" class="mx-8">
        <h1 class="text-center mb-3">No orders found.</h1>
      </div>

      <div v-else class="mx-8">
        <table
          class="min-w-full bg-white border border-gray-300 mt-4 mx-8 table-auto"
        >
          <thead class="bg-black text-white">
            <tr>
              <th class="border-b px-4 py-2 text-left">Order ID</th>
              <th class="border-b px-4 py-2 text-left">Order Item</th>
              <th class="border-b px-4 py-2 text-left">Delivery Address</th>
              <th class="border-b px-4 py-2 text-left">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order._id">
              <td class="border-b px-4 py-2">{{ order._id }}</td>

              <!-- Menampilkan Order Item -->
              <td class="border-b px-4 py-2">
                <ul>
                  <li v-for="item in order.orderItem" :key="item._id">
                    {{ item.name }} ({{ item.quantity }}) -
                    {{ item.price.toFixed(3) }},000
                  </li>
                </ul>
              </td>

              <td class="border-b px-4 py-2">
                {{ order.deliveryAddress.alamat }},
                {{ order.deliveryAddress.kecamatan }},
                {{ order.deliveryAddress.kelurahan }},
                {{ order.deliveryAddress.kabupaten }}
              </td>
              <td class="border-b px-4 py-2">
                Rp.{{ order.totalAmount.toFixed(3) }},000
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { useOrderStore } from "../stores/useOrderStore";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  components: { Navbar, Footer },
  name: "OrderPage",
  computed: {
    orders() {
      const store = useOrderStore();
      return store.orders; // Daftar pesanan
    },
    selectedOrder() {
      const store = useOrderStore();
      return store.selectedOrder; // Pesanan yang dipilih
    },
  },
  created() {
    const store = useOrderStore();
    store.fetchAllOrders();
  },
};
</script>

<style scoped>
/* Gaya untuk tabel daftar pesanan */
table {
  width: 90%; /* Ukuran tabel sedikit lebih kecil */
  border-collapse: collapse;
  margin: 0 auto;
}

th,
td {
  padding: 12px;
  text-align: left;
}

th {
  background-color: #000; /* Latar belakang hitam pada thead */
  color: white; /* Teks putih pada thead */
  font-weight: bold;
}

button {
  padding: 6px 12px;
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: #007bff;
  color: white;
}
</style>
