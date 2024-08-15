<template>
  <MainLayout>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title mb-4 text-center">Login</h2>
              <form @submit.prevent="handleLogin">
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
                <button type="submit" class="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
          <div class="text-center mt-3">
            <router-link to="/register" class="btn btn-link">Don't have an account? Register</router-link>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '../layout/MainLayout.vue';
import { login } from '../services/api/action';

export default {
  components: { MainLayout },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const data = await login(this.email, this.password);
        console.log('Login response:', data);
        if (data.token) {
          // Set token in localStorage or Vuex store
          localStorage.setItem('authToken', data.token);
          this.$store.commit('setUser', { email: data.email, token: data.token });
          this.$router.push('/campaigns');
          alert('Login successful!');
        } else {
          alert('Login failed: Invalid credentials');
        }
      } catch (error) {
        alert('Login error: ' + (error.response ? error.response.data.message : error.message));
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
