import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || "", // Retrieve token from localStorage if exists
    status: "",
    errorMessage: "",
  }),

  actions: {
    // Register Action
    async register(userCredentials) {
      this.status = "loading";
      this.errorMessage = "";

      try {
        const response = await axios.post(
          "http://localhost:4000/auth/register", // Adjust the URL if needed
          userCredentials
        );
        this.status = "success";
        return response.data;
      } catch (error) {
        this.status = "error";
        this.errorMessage =
          error.response?.data?.message || "Something went wrong";
        throw error;
      }
    },

    // Login Action
    async login(userCredentials) {
      this.status = "loading";
      this.errorMessage = "";

      try {
        // Send login request to backend
        const response = await axios.post(
          "http://localhost:4000/auth/login", // Backend login endpoint
          userCredentials
        );

        // Check if login is successful and set user and token
        this.token = response.data.token;
        this.user = response.data.user;

        // Save token and user data in localStorage for persistence
        localStorage.setItem("token", this.token);
        localStorage.setItem("user", JSON.stringify(this.user));

        // Set status to success
        this.status = "success";
        return response.data;
      } catch (error) {
        // Handle errors from backend
        this.status = "error";
        this.errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        throw error;
      }
    },

    // Logout Action
    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    // Load User from LocalStorage
    loadUserFromLocalStorage() {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (token && user) {
        this.token = token;
        this.user = user;
      }
    },
  },

  getters: {
    // Check if the user is authenticated
    isAuthenticated(state) {
      return !!state.token; // Return true if token exists
    },

    // Get user data
    getUser(state) {
      return state.user;
    },

    // Get status of the request (loading, success, error)
    getStatus(state) {
      return state.status;
    },

    // Get error message if any
    getErrorMessage(state) {
      return state.errorMessage;
    },
  },
});
