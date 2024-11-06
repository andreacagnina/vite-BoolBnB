import { createRouter, createWebHistory } from "vue-router";
import Homepage from './components/pages/Homepage.vue';
import PageNotFound from './components/pages/PageNotFound.vue';

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