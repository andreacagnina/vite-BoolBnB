import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/generals.scss';
import './styles/partials/partials.scss';

import App from './App.vue';
import { router } from './router';

createApp(App).use(router).mount('#app')
