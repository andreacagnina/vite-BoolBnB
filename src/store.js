import { reactive } from 'vue';

export const store = reactive({

    baseUrl: 'http://127.0.0.1:8000/api',
    menuItems: [
        { name: 'homepage', label: 'Home' },
        { name: 'UserProperties', label: 'My Properties' },
        { name: '', label: 'Statistics' }
    ],

    properties: [],
    last_page: null,
    current_page: 1,
    filterType: '',
    searchTerm: '',
    num_rooms: null, // Nuovo parametro per il filtro delle stanze
});
