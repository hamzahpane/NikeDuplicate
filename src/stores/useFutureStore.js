import { defineStore } from "pinia";
import { productFutureAPI } from "../config";
import axios from "axios";

export const useFutureStore = defineStore("useFuture", {
  state: () => ({
    productFuture: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchProductFuture() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(productFutureAPI);
        console.log(response);

        if (response.data && Array.isArray(response.data.data)) {
          this.productFuture = response.data.data;
        } else {
          throw new Error("Data tidak Masuk");
        }
      } catch (error) {
        console.error("Erro fetch product Future", error);
        this.error =
          error.response?.data?.message || " Failed to fetch product future";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchProductFutureID(id) {
      this.isLoading = true;
      console.log(id);
      try {
        const response = await axios.get(`${productFutureAPI}/${id}`);
        const product = response.data;
        return product.data;
      } catch (error) {
        console.error("Error Fetching Product BY ID", error);
        this.error = error.message || "Failed to fetch product.";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
