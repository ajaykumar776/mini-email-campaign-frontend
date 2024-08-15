<template>
  <MainLayout>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title mb-4 text-center">Register</h2>
              <form @submit.prevent="register">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input
                    v-model="name"
                    type="text"
                    id="text"
                    class="form-control"
                    placeholder="Name"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    id="email"
                    class="form-control"
                    placeholder="Email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    v-model="password"
                    type="password"
                    id="password"
                    class="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <button type="submit" class="btn btn-primary w-100">Register</button>
              </form>
            </div>
          </div>
          <div class="text-center mt-3">
            <router-link to="/login" class="btn btn-link">Already have an account? Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '../layout/MainLayout.vue';
import { registerUser } from '../services/api/action.js';

export default {
  components: { MainLayout },
  data() {
    return {
      name:'',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        const response = await registerUser({ name: this.name,email: this.email, password: this.password });
        if (response.user) {
          alert('Registration successful');
          this.$router.push('/login');
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        alert('Registration error');
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
