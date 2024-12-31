import { defineStore } from "pinia";
import axios from "axios";
import { getpayemnt } from "../config";

export const usePayemntStore = defineStore("usePayment", {
  state: () => ({
    payments: JSON.parse(localStorage.getItem("payments")) || [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchpayemnt() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(getpayemnt);
        this.payments = response.data;
        localStorage.setItem("payments", JSON.stringify(this.payments));
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
