import { reactive } from 'vue';

export const store = reactive({
    clientUrl: 'http://127.0.0.1:8000',
    baseUrl: 'http://127.0.0.1:8000/api',
    menuItems: [
        { name: 'homepage', label: 'Home' },
        { name: 'UserProperties', label: 'My Properties' },
        { name: '', label: 'Statistics' }
    ],

    properties: [],
    property: [],
    services: [],
    last_page: null,
    current_page: 1,
    filterType: '',
    searchTerm: '',
    num_rooms: null, // Nuovo parametro per il filtro delle stanze
    num_beds: null, // Nuovo parametro per il filtro delle beds
    num_baths: null, // Nuovo parametro per il filtro delle baths
    mq: null,
    price: null,
    selectedServices: [],
    isLoaded: false, // Stato di caricamento inizialmente false
    
    // Aggiunta di minMaxValues per i valori minimi e massimi recuperati dal backend
    minMaxValues: {
        min_rooms: 1,
        max_rooms: 10,
        min_beds: 1,
        max_beds: 10,
        min_baths: 1,
        max_baths: 5,
        min_mq: 20,
        max_mq: 500,
        min_price: 50,
        max_price: 1000
    },

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
    },
    formatPrice(price) {
        return price.toFixed(2).replace('.', ',') + ' €';
    },
    async fetchStoreData() {
        try {
          // Simula una chiamata API per caricare i dati (sostituisci con la tua API)
          const response = await fetch('http://127.0.0.1:8000/api/properties');
          this.properties = await response.json();
          this.isLoaded = true; // Imposta isLoaded a true solo dopo il caricamento
        } catch (error) {
          console.error("Errore nel caricamento dei dati", error);
          this.isLoaded = true; // Imposta isLoaded a true anche in caso di errore per evitare loop
        }
      }
});
