import { reactive } from 'vue';

export const store = reactive({
    baseUrl: 'http://127.0.0.1:8000/api',
    menuItems: [
        {
            name: 'homepage',
            label: 'Home',
        },
        {
            name: 'UserProperties',
            label: 'My Properties',
        },
        {
            name: '',
            label: 'Statistics',
        },
    ]
});