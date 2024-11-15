import { reactive } from 'vue';

export const store = reactive({
	clientUrl: 'http://127.0.0.1:8000',
	baseUrl: 'http://127.0.0.1:8000/api',

	// Menu di navigazione
	menuItems: [
		{ name: 'homepage', label: 'Home' },
		{ name: 'UserProperties', label: 'My Properties' },
		{ name: '', label: 'Statistics' }
	],

	// Proprietà della ricerca e dei filtri
	properties: [],
	property: [],
	services: [],
	last_page: null,
	current_page: 1,
	filterType: '',
	searchTerm: '',
	num_rooms: null,
	num_beds: null,
	num_baths: null,
	mq: null,
	price: null,
	selectedServices: [],
	latitude: null,
	longitude: null,
	radius: 20,  // Raggio di ricerca predefinito (km)

	// Valori minimi e massimi per i filtri
	minMaxValues: {
		min_rooms: 1, max_rooms: 10,
		min_beds: 1, max_beds: 10,
		min_baths: 1, max_baths: 5,
		min_mq: 20, max_mq: 500,
		min_price: 50, max_price: 1000,
	},

	// Icone mappate per ciascun tipo di proprietà
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

	// Funzione di formattazione prezzo
	formatPrice(price) {
		return `${price.toFixed(2).replace('.', ',')} €`;
	}
});
