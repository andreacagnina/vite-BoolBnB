import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from './components/HelloWorld.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: HelloWorld
        },
    ]
});

export { router };