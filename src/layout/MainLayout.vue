<template>
    <div class="d-flex flex-column min-vh-100">
      <!-- Header -->
      <header class="bg-dark text-white p-3">
        <div class="container d-flex justify-content-between align-items-center">
          <h1 class="h3 mb-0">Campaign App</h1>
          <nav>
            <!-- <router-link to="/" class="btn btn-outline-light mx-2">Home</router-link> -->
            <router-link v-if="isLoggedIn" to="/campaigns" class="btn btn-outline-light mx-2">Campaigns</router-link>
            <router-link v-if="!isLoggedIn" to="/login" class="btn btn-outline-light mx-2">Login</router-link>
            <router-link v-if="!isLoggedIn" to="/register" class="btn btn-outline-light mx-2">Register</router-link>
            <button v-if="isLoggedIn" @click="logout" class="btn btn-outline-light mx-2">Logout</button>
          </nav>
        </div>
      </header>
  
      <!-- Main content -->
      <main class="flex-fill p-3">
        <slot></slot>
      </main>
  
      <!-- Footer -->
      <footer class="bg-dark text-white p-3">
        <div class="container text-center">
          <p class="mb-0">&copy; 2024 Campaign App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainLayout',
    computed: {
      isLoggedIn() {
        return !!localStorage.getItem('authToken'); // Check if token exists in localStorage
      },
    },
    methods: {
      logout() {
        localStorage.removeItem('authToken'); // Remove token from localStorage
        this.$router.push('/login'); // Redirect to login page
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  