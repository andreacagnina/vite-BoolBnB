import { createRouter, createWebHistory } from "vue-router";
import Homepage from './pages/Homepage.vue';
import PageNotFound from './pages/PageNotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: Homepage
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: PageNotFound
        },
    ]
});

export { router };