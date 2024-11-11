import { createRouter, createWebHistory } from "vue-router";
import Homepage from './components/pages/Homepage.vue';
import  SingleProperty from './components/pages/SingleProperty.vue';
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
            path: '/property/:slug',
            name: 'property',
            component:
                SingleProperty,
        },

        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: PageNotFound
        },
    ]
});

export { router };