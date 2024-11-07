<script>
import PropertyCard from '../partials/PropertyCard.vue';
import { store } from '../../store';
import axios from 'axios';

export default {
    components: {
        PropertyCard
    },

    data() {
        return {
            store,
            properties: [],
            last_page: null,
            current_page: 1,  // Imposta la pagina corrente a 1 inizialmente
            filterType: '',   // Valore iniziale vuoto, nessun filtro applicato
            propertyTypes: [],  // Array vuoto inizialmente, da riempire con i tipi dinamicamente
        };
    },

    created() {
        this.getProperties();  // Carica le proprietà al momento della creazione del componente
        this.getPropertyTypes();  // Carica i tipi di proprietà dal backend
    },

    methods: {
        setFilter(type) {
            // Se l'utente seleziona "Tutti", il tipo di filtro sarà una stringa vuota
            this.filterType = type;   
            this.current_page = 1;    // Resetta alla prima pagina
            this.getProperties();     // Carica le proprietà con il filtro applicato
        },

        getProperties() {
            // Parametri della richiesta, inclusi il tipo di filtro e la pagina corrente
            const params = {
                page: this.current_page,
                type: this.filterType || null,  // Passa il tipo solo se è impostato, altrimenti nessun filtro
            };

            axios.get(`${store.baseUrl}/properties`, { params })
                .then((response) => {
                    this.properties = response.data.results.data;
                    this.last_page = response.data.results.last_page;
                    this.current_page = response.data.results.current_page;
                })
                .catch((error) => {
                    console.error("Errore durante il recupero delle proprietà:", error);
                });
        },

        goToPage(page) {
            if (page > 0 && page <= this.last_page) {
                this.current_page = page;  // Aggiorna la pagina corrente
                this.getProperties();      // Ricarica le proprietà per la nuova pagina
            }
        },

        // Funzione per ottenere il nome visualizzato per ogni tipo
        getDisplayName(type) {
            const typeNames = {
                apartment: 'Appartamento',
                house: 'Casa',
                office: 'Ufficio',
            };
            return typeNames[type] || type;  // Restituisce il nome visualizzato, o il tipo se non definito
        },

        // Ottieni i tipi di proprietà dal backend
        getPropertyTypes() {
            axios.get(`${store.baseUrl}/properties`)  // Effettua la richiesta al backend
                .then((response) => {
                    // Memorizza i tipi di proprietà disponibili
                    this.propertyTypes = response.data.types.map(type => type.type);
                })
                .catch((error) => {
                    console.error("Errore durante il recupero dei tipi di proprietà:", error);
                });
        }
    },
};
</script>




<template>
    <section class="homepage">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <div class="square-c d-flex justify-content-center align-items-center">
                        <!-- Lista per il filtro -->
                        <ul class="filter-list">
                            <!-- Aggiungi l'opzione "Tutti" -->
                            <li @click="setFilter('')" :class="{ active: filterType === '' }">Tutti</li>
                            <li v-for="type in propertyTypes" :key="type" @click="setFilter(type)" :class="{ active: filterType === type }">
                                {{ getDisplayName(type) }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Mostra le proprietà -->
            <div class="row g-3">
                <PropertyCard v-for="property in properties" :key="property.id" :property="property"/>
            </div>

            <!-- Paginazione -->
            <div class="row">
                <div class="col-12">
                    <nav aria-label="Page navigation example" class="d-flex justify-content-center py-3">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" :class="{ disabled: current_page === 1 }" href="#" @click.prevent="goToPage(current_page - 1)">Previous</a>
                            </li>
                            <li class="page-item" v-for="index in last_page" :key="index">
                                <a class="page-link" href="#" @click.prevent="goToPage(index)">{{ index }}</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" :class="{ disabled: current_page === last_page }" href="#" @click.prevent="goToPage(current_page + 1)">Next</a>
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
        justify-content: center;
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .filter-list li {
        padding: 10px 20px;
        cursor: pointer;
        border: 1px solid #ccc;
        margin: 0 5px;
        transition: background-color 0.3s ease;
    }

    .filter-list li:hover {
        background-color: #f0f0f0;
    }

    .filter-list li.active {
        background-color: #007bff;
        color: white;
        border-color: #007bff;
    }
</style>
