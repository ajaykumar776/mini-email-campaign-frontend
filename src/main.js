import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Create and mount Vue app
createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
