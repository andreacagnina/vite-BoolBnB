<script>

import axios from 'axios';
import { store } from '../../store';

export default {

	name: 'Filter',
	props: ['propertyTypes'],
	
	data() {
		return {

		store,
		numRooms: '',
		numBeds: '',
		numBaths: '',
		mq: '',
		price: '',
		selectedServices: [],
		radius: store.radius || 20,
		maxRadius: 200,

		};
	},

	computed: {
		minMaxValues() {
			return store.minMaxValues || {
				min_price: 50,
				max_price: 1000,
				min_mq: 20,
				max_mq: 500,
				min_rooms: 1,
				max_rooms: 10,
				min_beds: 1,
				max_beds: 10,
				min_baths: 1,
				max_baths: 5,

			};
		},
	},

	methods: {
		goToMarker() {
    const target = document.getElementById('marker');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },
		applyFilters() {
			store.num_rooms = this.numRooms;
			store.num_beds = this.numBeds;
			store.num_baths = this.numBaths;
			store.mq = this.mq;
			store.price = this.price;
			store.selectedServices = this.selectedServices;
			store.radius = Math.min(this.radius, this.maxRadius);
			store.current_page = 1;
		},

		setFilter(type) {
			store.filterType = type;
			store.current_page = 1;
		},

		resetFilters() {
			store.filterType = '';
			this.numRooms = '';
			this.numBeds = '';
			this.numBaths = '';
			this.mq = '';
			this.price = '';
			this.selectedServices = [];
			this.radius = 20;
			store.latitude = null;
			store.longitude = null;
			store.searchTerm = '';
			store.num_rooms = '';
			store.num_beds = '';
			store.num_baths = '';
			store.mq = '';
			store.price = '';
			store.selectedServices = [];
			store.radius = 20;
			store.current_page = 1;
		},

		async loadMinMaxValues() {
			try {
				const response = await axios.get(`${store.baseUrl}/properties`);
				if (response.data.success) {
					store.minMaxValues = response.data.minMaxValues;
				}
			} catch (error) {
				console.error('Errore nel caricamento dei valori min/max:', error);
			}
		},
	},

	mounted() {
		this.loadMinMaxValues();
	},
};

</script>


<template>
<!-- FILTRO PER TIPO DI PROPIETà -->
<div class="col-sm-12 col-lg-12">
	<div class="filter-by-type position-fixed z-2 w-100 d-flex justify-content-center align-items-center py-3">

		<ul class="filter-list">
			<!-- OPZIONE PER SETTARE SU "TUTTI" IL TIPO DI PROPIETà  -->
			<li class="mb-3 mb-md-0" @click="setFilter('')" :class="{ active: store.filterType === '' }">

				<img src="../../../public/icon/select-all-svgrepo-com.svg" alt="">
				<span class="d-none d-lg-block">All</span> 

			</li>
			<div class="overflow-x-auto whitespace-nowrap">
			<!-- CICLO PER I TIPI DI PROPIETà E METODO PER SETTARE IL FILTRO AL CLICK -->
			<li class="mb-3 mb-md-0" v-for="type in propertyTypes" :key="type" @click="setFilter(type), goToMarker()" :class="{ active: store.filterType === type }">

				<img :src="store.iconMap[type]" :alt="type" v-if="store.iconMap[type]" />
				<span class="d-none d-lg-block">{{ type }}</span>

			</li>

			<li >
				<!-- BOTTONE PER APRIRE IL CANVAS CON I FILTRI AVANZATI -->
				<button class="btn btn-filter mb-3 mb-md-0 m-0 p-0" data-bs-toggle="offcanvas" data-bs-target="#roomsOffcanvas" aria-controls="roomsOffcanvas">
					
					<img src="/public/icon/filters-2-svgrepo-com.svg" alt="filter" class="mb-1">
					<span class="d-none d-lg-block">Filter</span>
					
				</button>
			</li>
			<li @click="resetFilters" class="mb-3 mb-md-0" >
				<!-- BOTTONE PER RESETTARE TUTTI I FILTRI -->
					<img src="https://cdn-icons-png.flaticon.com/512/175/175076.png" alt="reset">
					<span class="d-none d-lg-block ">Reset</span>
	
			</li>
		</div>
		</ul>

	</div>
</div>

<!-- OFFCANVAS -->
<div class="offcanvas offcanvas-end d-flex flex-column" tabindex="-1" id="roomsOffcanvas" aria-labelledby="roomsOffcanvasLabel" data-bs-scroll="true">

	<div class="offcanvas-header">

		<h5 id="roomsOffcanvasLabel" class="fw-bold">Filters</h5>
		<button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" @click="resetFilters"></button>

	</div>
	<div class="offcanvas-body">

		<div class="mb-4">
			<label for="priceInput" class="form-label fw-bold">Price (Max)</label>
			<input id="priceInput" type="range" class="form-range" :min="minMaxValues.min_price" :max="minMaxValues.max_price" :step="0.01" v-model="price" />
			<p>€ {{ price }}</p>
		</div>

		<div class="mb-2">
			<label for="mqInput" class="form-label fw-bold">Square meters</label>
			<input id="mqInput" type="range" class="form-range" :min="minMaxValues.min_mq" :max="minMaxValues.max_mq" :step="0.01" v-model="mq" />
			<p>{{ mq }} m<sup>2</sup></p>
		</div>

		<div class="mb-4">
			<label for="radiusInput" class="form-label fw-bold">Radius</label>
			<input id="radiusInput" type="range" class="form-range" :min="20" :max="200" v-model="radius" />
			<p>{{ radius }} Km</p>
		</div>

		<div class="d-flex justify-content-between mb-3">
			<div class="w-33 px-1 mb-2">
				<label for="numRoomsInput" class="form-label fw-bold">Rooms</label>
				<input id="numRoomsInput" type="number" class="form-control" :min="minMaxValues.min_rooms" :max="minMaxValues.max_rooms" v-model="numRooms" placeholder="1 - 15" />
			</div>

			<div class="w-33 px-1 mb-2">
				<label for="numBedsInput" class="form-label fw-bold">Beds</label>
				<input id="numBedsInput" type="number" class="form-control" :min="minMaxValues.min_beds" :max="minMaxValues.max_beds" v-model="numBeds" placeholder="1 - 15" />
			</div>

			<div class="w-33 px-1 mb-2">
				<label for="numBathsInput" class="form-label fw-bold">Baths</label>
				<input id="numBathsInput" type="number" class="form-control" :min="minMaxValues.min_baths" :max="minMaxValues.max_baths" v-model="numBaths" placeholder="1 - 6" />
			</div>
		</div>

		<div class="mb-2 text-nowrap">
			<label for="servicesCheckbox" class="form-label fw-bold mb-3">Services</label>
			<div class="row">
			  <!-- Prima colonna -->
			  <div class="col-4">
				<div v-for="(service, index) in store.services.slice(0, Math.ceil(store.services.length / 3))" 
					 :key="service.id" 
					 class="form-check d-flex">
				  <input 
					type="checkbox" 
					class="form-check-input me-1" 
					:id="'service-' + service.id" 
					:value="service.id" 
					v-model="selectedServices" />
				  <label class="form-check-label" :for="'service-' + service.id">
					<i :class="service.icon" class="me-1 filter-icon"></i> {{ service.name }}
				  </label>
				</div>
			  </div>
		  
			  <!-- Seconda colonna -->
			  <div class="col-4">
				<div v-for="(service, index) in store.services.slice(Math.ceil(store.services.length / 3), Math.ceil((store.services.length * 2) / 3))" 
					 :key="service.id" 
					 class="form-check d-flex">
				  <input 
					type="checkbox" 
					class="form-check-input me-1" 
					:id="'service-' + service.id" 
					:value="service.id" 
					v-model="selectedServices" />
				  <label class="form-check-label" :for="'service-' + service.id">
					<i :class="service.icon" class="me-1 filter-icon"></i> {{ service.name }}
				  </label>
				</div>
			  </div>
		  
			  <!-- Terza colonna -->
			  <div class="col-4">
				<div v-for="(service, index) in store.services.slice(Math.ceil((store.services.length * 2) / 3))" 
					 :key="service.id" 
					 class="form-check d-flex">
				  <input 
					type="checkbox" 
					class="form-check-input me-1" 
					:id="'service-' + service.id" 
					:value="service.id" 
					v-model="selectedServices" />
				  <label class="form-check-label" :for="'service-' + service.id">
					<i :class="service.icon" class="me-1 filter-icon"></i> {{ service.name }}
				  </label>
				</div>
			  </div>
			</div>
		  </div>
		</div>
		<div class="offcanvas-footer">
			<button type="button" class="btn btn-custom-two  me-4" data-bs-dismiss="offcanvas" @click="applyFilters, goToMarker()">
				See Results
			</button>
			<button class="btn btn-custom-two " @click="resetFilters">
				Remove all filters
			</button>
		</div>
</div>

</template>

<style lang="scss" scoped>
	@use "../../styles/partials/partials.scss" as *;

	.overflow-x-auto {
		display: flex;
		overflow-x: scroll; /* Abilita lo scorrimento orizzontale */
		scrollbar-color: $pink-color #e0e0e000; /* Colore del thumb e del track per browser moderni */
		scrollbar-width: thin; /* Spessore sottile */
	}
	
	
	.inline-block {
		flex-shrink: 0; /* Impedisce agli elementi di ridimensionarsi */
	}

	.filter-by-type {
		top: 110px;
		left: 0;
		background-color: $background-color;
		padding: 40px 0px;
	}

	.w-33 {
		width: calc(100% / 3);
	}

	.form-check-input {
		cursor: pointer;
		&:checked {
			background: linear-gradient(45deg, #ce6a6c, #ebada2);
			border: none;
		}
		.filter-icon {
			color: #f7ede2;
		}
	}

	.filter-list {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		list-style: none;
		overflow-x: auto;
		padding: 0;
		margin: 0;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;
	}

	.filter-list::-webkit-scrollbar {
		display: none;
	}

	.filter-list li {
		color: #f7ede2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: none;
		margin: 0 20px;
		padding: 0;
		cursor: pointer;

		span {
			text-transform: capitalize;
		}

		img {
			width: 30px;
			height: 30px;
			margin-bottom: 5px;
			text-align: center;
			filter: brightness(0) invert(1);
		}

		&:hover {
			color: #ce6a6c;
			transform: scale(1.05);
			transition: all 0.3s ease-in-out;

			img {
				filter: brightness(0) saturate(100%) invert(48%) sepia(33%) saturate(545%) hue-rotate(300deg) brightness(96%) contrast(94%);
			}
		}
	}

	.next-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: linear-gradient(45deg, #ce6a6c, #ebada2);
		color: #f7ede2;
		font-size: 18px;
		border: none;
		cursor: pointer;
		transition: background-color 0.3s ease;

		&:hover {
			transform: scale(1.05);
			transition: all 0.3s ease-in-out;
		}
	}

	.filter-list li.active {
		position: relative;
		color: #ebada2;

		img {
			filter: brightness(0) saturate(100%) invert(46%) sepia(19%) saturate(476%) hue-rotate(289deg) brightness(95%) contrast(85%);
		}
	}

	.filter-list li.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 50%;
		height: 1px;
		background-color: #ebada2;
	}

	.offcanvas {
		padding: 0; /* Rimuove il padding interno */
		margin: 0;  /* Rimuove il margine esterno */
		border: none; /* Rimuove eventuali bordi */
		background-color: #49919d; /* Assicura che il background sia uniforme */

		
	  }
	  .offcanvas-footer, .offcanvas-header {
		text-align: center;
		border: none;
		color: #f7ede2;
		background-color: $darkgreen-color;
		padding: 20px;
		.btn-custom-two {
			color: #f7ede2;
			background: linear-gradient(250deg, #ce6a6c, #ebada2);
			border-radius: 10px;
			border: none;
			padding: 10px 20px;
			cursor: pointer;
			transition: all 0.3s ease;

	
			&:hover {
				transform: scale(1.05);
			}
		}
	  }

	
	.offcanvas-body  {
		text-align: center;
		color: #f7ede2;
		background-color: #49919d;
		padding: 20px;
		border: none;
		

		.btn-custom {
			color: #f7ede2;
			background: linear-gradient(45deg, #ce6a6c, #ebada2);
			border-radius: 10px;
			border: none;
			padding: 10px 20px;
			cursor: pointer;
			transition: all 0.3s ease;

			&:hover {
				transform: scale(1.05);
			}

		}

	}

	.list-group-item {
		cursor: pointer;
		padding: 10px 20px;
		background: linear-gradient(360deg, #ce6a6c, #ebada2);
		border: none;
		color: #fff;
		border-radius: 5px;
		margin-bottom: 5px;
		transition: all 0.3s ease;
	}

	.list-group-item.active {
		background-color: #f7ede2;
		color: #333;
		font-weight: bold;
	}

	.btn-filter {
		color: #f7ede2;
		border: none;
		border-radius: 5px;
		padding: 10px 20px;
		cursor: pointer;
		transition: all 0.3s ease;

		img {
			width: 22px;
			height: 22px;
			margin-right: 5px;
			text-align: center;
			filter: brightness(0) invert(1);
		}

		&:hover {
			transform: scale(1.1);
			color: #ce6a6c;

			img {
				filter: brightness(0) saturate(100%) invert(48%) sepia(33%) saturate(545%) hue-rotate(300deg) brightness(96%) contrast(94%);
			}
		}
	}

	.form-control {
		background-color: #f7ede2;
	}

	.offcanvas {
		width: 50%; /* Personalizza la larghezza */
	}

	@media (max-width: 1024px) {
		.offcanvas {
			width: 75%; /* Larghezza piena per dispositivi mobili */
		}
	}
	
	@media (max-width: 768px) {
		.offcanvas {
			width: 100%; /* Larghezza piena per dispositivi mobili */
		}
	}
</style>
