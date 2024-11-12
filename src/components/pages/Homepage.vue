<script>
import { store } from '../../store';
import PropertyCard from '../partials/PropertyCard.vue';
import Filter from '../partials/Filter.vue';
import axios from 'axios';

export default {
    components: { Filter, PropertyCard },
    data() {
        return {
            store,
            propertyTypes: [],
        };
    },
    created() {
        this.getProperties();
        this.getPropertyTypes();
        console.log(store.properties);
    },
    watch: {
        'store.searchTerm': 'getProperties',
        'store.filterType': 'getProperties',
        'store.current_page': 'getProperties',
        'store.num_rooms': 'getProperties', // watch per le stanze
        'store.num_beds': 'getProperties', // watch per le beds
        'store.num_baths': 'getProperties', // watch per le baths
        'store.mq': 'getProperties',
        'store.price': 'getProperties',
        'store.selectedServices': 'getProperties'

    },
    methods: {
        getProperties() {
            const params = {
                page: store.current_page,
                type: store.filterType || null,
                search: store.searchTerm || null,
                num_rooms: store.num_rooms || null, // filtro num_rooms
                num_beds: store.num_beds || null, // filtro num_beds
                num_baths: store.num_baths || null, // filtro num_baths   
                mq: store.mq || null,
                price: store.price || null,
                selectedServices: store.selectedServices           
            };
            axios.get(`${store.baseUrl}/properties`, { params })
                .then(response => {
                    store.properties = response.data.results.data;
                    store.last_page = response.data.results.last_page;
                });
        },
        getPropertyTypes() {
            axios.get(`${store.baseUrl}/properties`)
                .then((response) => {
                    this.propertyTypes = response.data.types.map(type => type.type);
                })
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
    <section class="homepage">
        <div class="container-fluid px-4">
            <!-- Filtro sopra le schede -->
            <div class="row">
                <div class="col-12 mb-4">
                    <Filter :propertyTypes="propertyTypes" />
                </div>
            </div>

            <!-- Contenuto delle schede -->
            <div class="row g-3">
                <PropertyCard v-for="property in store.properties" :key="property.id" :property="property" />
            </div>

            <!-- Paginazione -->
            <div class="row">
                <div class="col-12">
                    <nav aria-label="Page navigation example" class="d-flex justify-content-center py-3 mt-4">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" :class="{ disabled: store.current_page === 1 }" href="#" @click.prevent="goToPage(store.current_page - 1)">Previous</a>
                            </li>
                            <li class="page-item" v-for="index in store.last_page" :key="index">
                                <a class="page-link" href="#" @click.prevent="goToPage(index)">{{ index }}</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" :class="{ disabled: store.current_page === store.last_page }" href="#" @click.prevent="goToPage(store.current_page + 1)">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>

    .homepage {
        padding: 30px 0;    
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
</style>