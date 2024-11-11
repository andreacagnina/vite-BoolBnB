import { reactive } from 'vue';

export const store = reactive({
    baseUrl: 'http://127.0.0.1:8000/api',
    menuItems: [
        { name: 'homepage', label: 'Home' },
        { name: 'UserProperties', label: 'My Properties' },
        { name: '', label: 'Statistics' }
    ],

    properties: [],
    property:[],
    last_page: null,
    current_page: 1,
    filterType: '',
    searchTerm: '',
    num_rooms: null, // Nuovo parametro per il filtro delle stanze
    num_beds: null, // Nuovo parametro per il filtro delle stanze

    // Mappatura delle icone per ciascun tipo di proprietà
    iconMap: {
        mansion: '/public/icon/castle-fortress-svgrepo-com.svg',
        'ski-in/out': '/public/icon/ski-svgrepo-com.svg',
        'tree-house': '/public/icon/tree-house-svgrepo-com.svg',
        apartment: '/public/icon/apartment-svgrepo-com.svg',
        dome: '/public/icon/dome-svgrepo-com.svg',
        cave: '/public/icon/cave-svgrepo-com.svg',
        cabin: '/public/icon/yurt-svgrepo-com.svg',
        lake: '/public/icon/lake-area-svgrepo-com.svg',
        beach: '/public/icon/beach-area-svgrepo-com.svg',
        castle: '/public/icon/castle-svgrepo-com.svg'
    }
});
