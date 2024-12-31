import { defineStore } from "pinia";
import { getProductMan, getCategoryAPI } from "../config";
import axios from "axios";

export const useProductManStore = defineStore("useMan", {
  state: () => ({
    productMan: [],
    categoryMan: [],
    filteredProducts: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchProductMan(categoryId = null) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(getProductMan);
        console.log(response);

        if (response.data && Array.isArray(response.data.data)) {
          if (categoryId) {
            this.filteredProducts = response.data.data.filter(
              (product) => product.category === categoryId
            );
          } else {
            this.filteredProducts = response.data.data;
          }
        } else {
          throw new Error("Data tidak masuk");
        }
      } catch (error) {
        console.log("Error fetching product man", error);
        this.error =
          error.response?.data?.message || " failed to fetch product Man";
      } finally {
        this.isLoading = false;
      }
    },
    async fetchCetegoryMan() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(getCategoryAPI);
        console.log(response);

        if (response.data && Array.isArray(response.data)) {
          this.categoryMan = response.data;
        } else {
          throw new Error("Data tidak masuk");
        }
      } catch (error) {
        console.log("Error fetching categories", error);
        this.error =
          error.response?.data?.message || "Failed to fetch categories";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchManById(id) {
      this.isLoading = true;

      try {
        const response = await axios.get(`${getProductMan}/${id}`);
        return response.data?.data || null;
      } catch (error) {
        console.error("erroFetshing Product  by ID :", error);
        this.error = error.message || " failed to fetch prodcut";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
