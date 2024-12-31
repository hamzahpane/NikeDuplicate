import { defineStore } from "pinia";
import axios from "axios";
import { getProductWomen, getCategoryWopmen, getSizeWomen } from "../config";

export const useProductWomenStore = defineStore("productWomen", {
  state: () => ({
    products: [],
    filteredProducts: [],
    categoryWomen: [],
    sizeWomen: [],
    isLoading: false,
    error: null,
    selectedCategory: null,
    selectedSize: null,
  }),
  actions: {
    async fetchProductWomen(categoryId = null, sizeId = null) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(getProductWomen);
        if (response.data && Array.isArray(response.data.data)) {
          let filteredData = response.data.data;

          // Filter berdasarkan kategori jika categoryId diberikan
          if (categoryId) {
            filteredData = filteredData.filter(
              (product) => product.category === categoryId
            );
          }

          if (sizeId) {
            filteredData = filteredData.filter(
              (product) => product.size === sizeId
            );
          }

          this.filteredProducts = filteredData;
        } else {
          throw new Error("Data produk tidak valid");
        }
      } catch (error) {
        this.error = error.message || "Gagal mengambil data produk";
      } finally {
        this.isLoading = false;
      }
    },
    async fetchCategoryWomen() {
      try {
        const response = await axios.get(getCategoryWopmen);
        if (response.data) {
          this.categoryWomen = response.data;
        }
      } catch (error) {
        this.error = error.message || "Gagal mengambil data kategori";
      }
    },

    async fetchSizeWomen() {
      try {
        const response = await axios.get(getSizeWomen);
        if (response.data) {
          this.sizeWomen = response.data;
        }
      } catch (error) {
        this.error = error.message || "Gagal mengambil data ukuran";
      }
    },

    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
      this.fetchProductWomen(categoryId);
    },

    selectSize(sizeId) {
      this.selectedSize = sizeId;
      this.fetchProductWomen(null, sizeId);
    },

    async fetchProductById(id) {
      this.isLoading = true;

      try {
        const response = await axios.get(`${getProductWomen}/${id}`);
        return response.data?.data || null;
      } catch (error) {
        console.error("Error fetching product by ID:", error);
        this.error = error.message || "Failed to fetch product";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
