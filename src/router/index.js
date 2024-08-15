import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Campaigns from '../views/Campaigns.vue';
import CreateCampaign from '../components/Campaign/CreateCampaign.vue';

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken'); // Check for token in localStorage
};

const routes = [
  {
    path: '/',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next('/campaigns'); // Redirect authenticated users to campaigns
      } else {
        next(); // Allow access if not authenticated
      }
    },
  },
  {
    path: '/login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next('/campaigns'); // Redirect authenticated users to campaigns
      } else {
        next(); // Allow access if not authenticated
      }
    },
  },
  {
    path: '/register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next('/campaigns'); // Redirect authenticated users to campaigns
      } else {
        next(); // Allow access if not authenticated
      }
    },
  },
  {
    path: '/campaigns',
    component: Campaigns,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next(); // Allow access if authenticated
      } else {
        next('/login'); // Redirect to login if not authenticated
      }
    },
  },
  {
    path: '/create-campaign',
    component: CreateCampaign,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next(); // Allow access if authenticated
      } else {
        next('/login'); // Redirect to login if not authenticated
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
