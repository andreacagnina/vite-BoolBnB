<script>
import { store } from '../../store';
import { ref } from 'vue';
import axios from 'axios';

export default {
    name: 'Filter',
    props: ['propertyTypes'],
    setup() {
        // Variabili locali per i filtri
        const numRooms = ref('');
        const numBeds = ref('');
        const numBaths = ref('');
        const mq = ref('');
        const price = ref('');
        const selectedServices = ref([]);

        // Funzione per applicare i filtri al clic su "See Results"
        const applyFilters = () => {
            store.num_rooms = numRooms.value;
            store.num_beds = numBeds.value;
            store.num_baths = numBaths.value;
            store.mq = mq.value;
            store.price = price.value;
            store.selectedServices = selectedServices.value;
            store.current_page = 1;
        };

        // Funzione per impostare il filtro per tipo di proprietà
        const setFilter = (type) => {
            store.filterType = type;
            store.current_page = 1;
        };

        // Funzione per resettare tutti i filtri
        const resetFilters = () => {
            store.filterType = '';
            numRooms.value = '';
            numBeds.value = '';
            numBaths.value = '';
            mq.value = '';
            price.value = '';
            selectedServices.value = [];
            store.num_rooms = '';
            store.num_beds = '';
            store.num_baths = '';
            store.mq = '';
            store.price = '';
            store.selectedServices = [];
            store.current_page = 1;
        };

        // Funzione per caricare i valori minimi e massimi dal backend
        const loadMinMaxValues = async () => {
            try {
                const response = await axios.get(`${store.baseUrl}/properties`);
                if (response.data.success) {
                    store.minMaxValues = response.data.minMaxValues;
                }
            } catch (error) {
                console.error("Errore nel caricamento dei valori min/max:", error);
            }
        };

        // Carica i valori minimi e massimi all'inizio
        loadMinMaxValues();

        return {
            store,
            numRooms,
            numBeds,
            numBaths,
            mq,
            price,
            selectedServices,
            setFilter,
            applyFilters,
            resetFilters,
            loadMinMaxValues,
        };
    },
};
</script>

<template>
    <div class="col-sm-12 col-lg-12">
        <div class="d-flex justify-content-center align-items-center mt-1 mb-3">
            <!-- Filtro type -->
            <ul class="filter-list">
                <li @click="setFilter('')" :class="{ active: store.filterType === '' }">
                    <img src="../../../public/icon/select-all-svgrepo-com.svg" alt="">
                    <span>All</span>
                </li>
                <li v-for="type in propertyTypes" :key="type" @click="setFilter(type)"
                    :class="{ active: store.filterType === type }">
                    <img :src="store.iconMap[type]" :alt="type" v-if="store.iconMap[type]" />
                    <span>{{ type }}</span>
                </li>
            </ul>

            <!-- Bottone Offcanvas -->
            <button class="btn btn-filter ms-4" data-bs-toggle="offcanvas" data-bs-target="#roomsOffcanvas"
                aria-controls="roomsOffcanvas">
                <img src="/public/icon/filters-2-svgrepo-com.svg" alt="filter">
                <span class="d-none d-sm-block">Filter</span>
            </button>
        </div>
    </div>

    <!-- Offcanvas per il filtro avanzato -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="roomsOffcanvas" aria-labelledby="roomsOffcanvasLabel"
        data-bs-scroll="true">
        <div class="offcanvas-header">
            <h5 id="roomsOffcanvasLabel" class="fw-bold">Filters</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"
                @click="resetFilters"></button>
        </div>
        <div class="offcanvas-body">
            <!-- Gruppo di label per stanze e letti -->
            <div class="d-flex justify-content-between mb-3">
                <div class="w-50 me-2 mb-2">
                    <label for="numRoomsInput" class="form-label fw-bold">Rooms</label>
                    <input id="numRoomsInput" type="number" class="form-control"
                        :min="store.minMaxValues.min_rooms || 1"
                        :max="store.minMaxValues.max_rooms || 10"
                        v-model="numRooms"
                        placeholder="">
                </div>

                <div class="w-50 mb-2">
                    <label for="numBedsInput" class="form-label fw-bold">Beds</label>
                    <input id="numBedsInput" type="number" class="form-control"
                        :min="store.minMaxValues.min_beds || 1"
                        :max="store.minMaxValues.max_beds || 10"
                        v-model="numBeds"
                        placeholder="">
                </div>
            </div>

            <!-- Gruppo di label per bagni e mq -->
            <div class="d-flex justify-content-between mb-3">
                <div class="w-50 me-2 mb-2">
                    <label for="numBathsInput" class="form-label fw-bold">Baths</label>
                    <input id="numBathsInput" type="number" class="form-control"
                        :min="store.minMaxValues.min_baths || 1"
                        :max="store.minMaxValues.max_baths || 5"
                        v-model="numBaths"
                        placeholder="">
                </div>

                <div class="w-50 mb-2">
                    <label for="mqInput" class="form-label fw-bold">m<sup>2</sup></label>
                    <input id="mqInput" type="number" class="form-control"
                        :min="store.minMaxValues.min_mq || 20"
                        :max="store.minMaxValues.max_mq || 500"
                        v-model="mq"
                        placeholder="">
                </div>
            </div>

            <!-- Filtro per prezzo -->
            <div class="mb-4">
                <label for="priceInput" class="form-label fw-bold">Price</label>
                <input id="priceInput" type="number" class="form-control"
                    :min="store.minMaxValues.min_price || 50"
                    :max="store.minMaxValues.max_price || 1000"
                    v-model="price"
                    placeholder="">
            </div>

            <!-- Checkbox per i servizi -->
            <div class="mb-4">
                <label for="servicesCheckbox" class="form-label fw-bold mb-3">Services</label>
                <div class="row">
                    <div class="col-md-6">
                        <div v-for="(service, index) in store.services.slice(0, Math.ceil(store.services.length / 2))"
                            :key="service.id" class="form-check d-flex">
                            <input type="checkbox" class="form-check-input me-1" :id="'service-' + service.id"
                                :value="service.id" v-model="selectedServices">
                            <label class="form-check-label" :for="'service-' + service.id">
                                <i :class="service.icon" class="me-1 filter-icon"></i> {{ service.name }}
                            </label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div v-for="(service, index) in store.services.slice(Math.ceil(store.services.length / 2))"
                            :key="service.id" class="form-check d-flex">
                            <input type="checkbox" class="form-check-input me-1" :id="'service-' + service.id"
                                :value="service.id" v-model="selectedServices">
                            <label class="form-check-label" :for="'service-' + service.id">
                                <i :class="service.icon" class="me-1 filter-icon"></i> {{ service.name }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pulsante per rimuovere i filtri -->
            <button class="btn btn-custom w-100 mt-4" @click="resetFilters">
                Remove all filters
            </button>

            <!-- Pulsante per applicare i filtri -->
            <button type="button" class="btn btn-custom-two w-100 mt-4" data-bs-dismiss="offcanvas" @click="applyFilters">
                See Results
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form-check-input{
    cursor: pointer;
    &:checked{
        background:linear-gradient(45deg, #ce6a6c, #ebada2);
        border: none;
    }
    .filter-icon{
        color: #f7ede2;
    }
}

.filter-list {
    display: flex;
    align-items: center;
    justify-content: flex-start; // Cambia da "center" a "flex-start" per evitare di nascondere gli elementi iniziali
    list-style: none;
    overflow-x: auto;
    padding: 0;
    margin: 0;
    scrollbar-width: none;
    /* Nasconde la scrollbar in Firefox */
    -webkit-overflow-scrolling: touch; // Aggiungi per supporto su iOS
}

.filter-list::-webkit-scrollbar {
    display: none;
    /* Nasconde la scrollbar in Chrome, Safari e Edge */
}

.filter-list li {
    color: #f7ede2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    margin: 0 20px 0 20px;
    cursor: pointer;

    span {
        text-transform: capitalize;
    }

    img {
        width: 24px;
        height: 24px;
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

.offcanvas-header,
.offcanvas-body {
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
</style>
