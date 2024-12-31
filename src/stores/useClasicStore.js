import { defineStore } from "pinia";
import axios from "axios";
import { productClasicAPI } from "../config";

export const useClassicStore = defineStore("useClassic", {
  state: () => ({
    productClasic: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fecthProductClasic() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(productClasicAPI);
        console.log(response);

        if (response.data && Array.isArray(response.data.data)) {
          this.productClasic = response.data.data;
        } else {
          throw new Error("Data tidak masuk");
        }
      } catch (error) {
        console.error("Error fetching product classic:", error);
        this.error =
          error.response?.data?.message || "Failed to fetch product news.";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchProductById(id) {
      this.isLoading = true;
      console.log(id);
      try {
        const response = await axios.get(`${productClasicAPI}/${id}`);
        const product = response.data;
        return product.data;
      } catch (error) {
        console.error("Error fetching product by ID:", error);
        this.error = error.message || "Failed to fetch product.";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
