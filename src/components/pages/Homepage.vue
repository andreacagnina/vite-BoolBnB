<script>
import { store } from '../../store';
import PropertyCard from '../partials/PropertyCard.vue';
import Filter from '../partials/Filter.vue';
import axios from 'axios';
import Loader from '../partials/Loader.vue';
import Jumbotron from '../partials/Jumbotron.vue';




export default {
    components: { Filter, PropertyCard, Loader, Jumbotron, },
    data() {
        return {
            store,
            propertyTypes: [],
            loadingPage: true,
            loadingResults: true,
        };
    },
    created() {
        this.getProperties();
        this.getPropertyTypes();
        this.getServices();

    },
    watch: {
        'store.searchTerm': 'getProperties',
        'store.filterType': 'getProperties',
        'store.current_page': 'getProperties',
        'store.num_rooms': 'getProperties',
        'store.num_beds': 'getProperties',
        'store.num_baths': 'getProperties',
        'store.mq': 'getProperties',
        'store.price': 'getProperties',
        'store.selectedServices': 'getProperties',
        'store.latitude': 'getProperties',
        'store.longitude': 'getProperties',
        'store.radius': 'getProperties'
    },
    methods: {

        getPropertyTypes() {
            this.loadingPage = true;
            axios.get(`${store.baseUrl}/properties`)
                .then(response => {
                    this.propertyTypes = response.data.types.map(type => type.type);
                    this.loadingPage = false;
                });
        },
        getProperties() {
            const params = {
                page: store.current_page,
                type: store.filterType || null,
                search: store.searchTerm || null,
                num_rooms: store.num_rooms || null,
                num_beds: store.num_beds || null,
                num_baths: store.num_baths || null,
                mq: store.mq || null,
                price: store.price || null,
                selectedServices: store.selectedServices,
                latitude: store.latitude,
                longitude: store.longitude,
                radius: store.radius || 20 
                
            };
            this.loadingResults = true;
            axios.get(`${store.baseUrl}/properties`, { params })
            .then(response => {
                store.properties = response.data.results.data;
                store.last_page = response.data.results.last_page;
                store.total_results = response.data.results.total;
                this.loadingResults=false;
            })
            .catch(error => {
                console.error('Errore nel caricamento delle proprietà:', error);
            });
        },
        getServices() {

            axios.get(`${store.baseUrl}/services`)
                .then(response => {
                    store.services = response.data.results;

                });
        },
        goToPage(page) {
  
            if (page > 0 && page <= store.last_page) {
                store.current_page = page;
 
            }
        },
    },
};
</script>

<template>
    <Loader v-if="loadingPage" class="h-100 middle"/>
    
    <section v-else class="homepage h-100">
        <Jumbotron />
        <div class="custom-container">
            <!-- Filtro sopra le schede -->
            <div class="row">
                <Filter :propertyTypes="propertyTypes"/>
            </div>

            <!-- Contenuto delle schede -->
                <Loader v-if="loadingResults" class="h-cust mt-md-3 pt-md-1" />
    
            <div v-else class="wrapper">
                
                <div class="row"  >
                    <PropertyCard v-if="store.total_results>0"  v-for="property in store.properties" :key="property.id" :property="property" />
                        <h3 v-else class="text-center text-light my-0 py-5">***No results found. Please try again with different filters.***</h3>
                </div>

                <!-- Paginazione -->
                <div v-if="store.total_results > 24" class="row">
                    <div class="col-12">
                </div>
                    <nav aria-label="Page navigation example" class="d-flex justify-content-center py-3 mt-4">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" :class="{ disabled: store.current_page === 1 }" href="#"
                                    @click.prevent="goToPage(store.current_page - 1)">Previous</a>
                            </li>
                            <li class="page-item" v-for="index in store.last_page" :key="index">
                                <a class="page-link" href="#" @click.prevent="goToPage(index)">{{ index }}</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" :class="{ disabled: store.current_page === store.last_page }"
                                    href="#" @click.prevent="goToPage(store.current_page + 1)">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

    </section>
</template>

<style lang="scss" scoped>

.custom-container {
    max-width: 100%; /* Imposta una larghezza massima */
    margin: 50px auto 0px auto; /* Centra il container */
    padding: 0px 75px;
}

.homepage {
    padding: 30px 0;
}

.h-cust {
    height: calc(100% - 115px);
}



.filter-list {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
}

.filter-list li {
    margin-right: 15px;
    padding: 5px 10px;
    background: linear-gradient(360deg, #ce6a6c, #ebada2);
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        transform: scale(1.15);
        transition: all 0.3s ease-in-out;
        color: #f7ede2;
    }
}

.filter-list li.active {
    color: #f7ede2;
    transform: scale(1.15);
}

ul.pagination {
    background-color: transparent !important;
    background: linear-gradient(45deg, #ce6a6c, #ebada2);
    border-radius: 10px;
}

ul.pagination .page-item {
    background-color: transparent !important;
}

ul.pagination .page-item .page-link {
    background-color: transparent !important;
    color: #f6bd60 !important;
    border: none !important;
    margin: 0 5px !important;
}

ul.pagination .page-item .page-link {
    color: #f7ede2 !important;
}

ul.pagination .page-item .page-link:hover {
    color: #192033 !important;
}

@media (max-width: 992px) {
    .custom-container {
        padding: 0px 15px;
    }
}

</style>
