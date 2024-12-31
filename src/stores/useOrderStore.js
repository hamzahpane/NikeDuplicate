import { defineStore } from "pinia";
import { orderAllitem } from "../config";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [],
    selectedOrder: null,
  }),
  actions: {
    async fetchAllOrders() {
      try {
        const response = await fetch(orderAllitem);
        const data = await response.json();
        if (data.orders) {
          this.orders = data.orders;
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    },

    setOrders(orders) {
      this.orders = orders;
    },
    setSelectedOrder(order) {
      this.selectedOrder = order;
    },
  },
});
