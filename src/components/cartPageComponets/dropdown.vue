<template>
  <div class="mb-4">
    <label for="payment-method" class="block text-sm font-medium text-gray-700">
      Pilih Metode Pembayaran
    </label>
    <select
      id="payment-method"
      :value="selectedPayment"
      @input="updatePayment"
      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option disabled value="">Pilih metode pembayaran...</option>
      <option
        v-for="payment in payments"
        :key="payment.id"
        :value="payment._id"
      >
        {{ payment.Name }}
      </option>
    </select>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { usePayemntStore } from "../../stores/usePayment";

export default {
  name: "Dropdown",
  props: {
    selectedPayment: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const paymentStore = usePayemntStore();
    const payments = ref([]);
    console.log(payments);

    const selectedPayment = ref(props.selectedPayment); // Local reactive state for selected payment

    // Emit the updated payment value
    const updatePayment = (event) => {
      selectedPayment.value = event.target.value; // Update local state
      console.log(event.target.value);
      emit("update:selectedPayment", selectedPayment.value); // Emit the new value to parent
    };

    onMounted(async () => {
      if (!paymentStore.payments.length) {
        await paymentStore.fetchpayemnt(); // Fetch payment methods
      }
      payments.value = paymentStore.payments;
    });

    return {
      payments,
      selectedPayment,
      updatePayment, // Bind the update function
    };
  },
};
</script>
