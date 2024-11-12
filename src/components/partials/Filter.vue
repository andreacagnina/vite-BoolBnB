<script>
import { store } from '../../store';

export default {
    name: 'Filter',
    props: ['propertyTypes'],
    setup() {
        // Funzione per impostare il filtro tipo
        const setFilter = (type) => {
            store.filterType = type;
            store.current_page = 1;
        };

        // Funzione per impostare il filtro numero stanze
        const setAdvancedFilter = (numRooms, numBeds, numBaths, mq, price, selectedServices) => {
            store.num_rooms = numRooms;
            store.num_beds = numBeds;
            store.num_baths = numBaths;
            store.mq = mq;
            store.price = price;
            store.selectedServices = selectedServices;
            store.current_page = 1;
        };

        // Funzione per resettare tutti i filtri
        const resetFilters = () => {
            store.filterType = '';
            store.num_rooms = '';
            store.num_beds = '';
            store.num_baths = '';
            store.mq = '';
            store.price = '';
            store.selectedServices = [];
            store.current_page = 1;
        };

        return { store, setFilter, setAdvancedFilter, resetFilters };
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
                <li v-for="type in propertyTypes" :key="type" @click="setFilter(type)" :class="{ active: store.filterType === type }">
                    <!-- Icona sopra il nome del tipo -->
                    <img :src="store.iconMap[type]" :alt="type" v-if="store.iconMap[type]" />
                    <span>{{ type }}</span>
                </li>
            </ul>
            <button class="next-button mx-3 d-none d-sm-block">
                <i class="fa-solid fa-angle-right"></i>
            </button>
    
            <!-- Bottone Offcanvas -->
            <button class="btn btn-filter ms-4" data-bs-toggle="offcanvas" data-bs-target="#roomsOffcanvas" aria-controls="roomsOffcanvas">
                <img src="/public/icon/filters-2-svgrepo-com.svg" alt="filter">
                <span class="d-none d-sm-block">Filter</span>
            </button>
        </div>
    </div>

    <!-- Offcanvas per il filtro avanzato -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="roomsOffcanvas" aria-labelledby="roomsOffcanvasLabel" data-bs-scroll="true">
    <div class="offcanvas-header">
        <h5 id="roomsOffcanvasLabel" class="fw-bold">Filters</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" @click="resetFilters"></button>
    </div>
    <div class="offcanvas-body">
        <!-- Gruppo di label per stanze e letti -->
        <div class="d-flex justify-content-between mb-3">
            <div class="w-50 me-2">
                <label for="numRoomsInput" class="form-label fw-bold">Number of rooms</label>
                <input
                    id="numRoomsInput"
                    type="number"
                    class="form-control"
                    min="1"
                    max="50"
                    v-model="store.num_rooms"
                    @input="setAdvancedFilter(store.num_rooms, store.num_beds, store.num_baths, store.mq, store.price)"
                    placeholder="Input the room">
            </div>

            <div class="w-50">
                <label for="numBedsInput" class="form-label fw-bold">Number of beds</label>
                <input
                    id="numBedsInput"
                    type="number"
                    class="form-control"
                    min="1"
                    max="20"
                    v-model="store.num_beds"
                    @input="setAdvancedFilter(store.num_rooms, store.num_beds, store.num_baths, store.mq, store.price)"
                    placeholder="Input the bed">
            </div>
        </div>

        <!-- Gruppo di label per bagni e mq -->
        <div class="d-flex justify-content-between mb-3">
            <div class="w-50 me-2">
                <label for="numBathsInput" class="form-label fw-bold">Number of baths</label>
                <input
                    id="numBathsInput"
                    type="number"
                    class="form-control"
                    min="0"
                    max="5"
                    v-model="store.num_baths"
                    @input="setAdvancedFilter(store.num_rooms, store.num_beds, store.num_baths, store.mq, store.price)"
                    placeholder="Input the bath">
            </div>

            <div class="w-50">
                <label for="mqInput" class="form-label fw-bold">Number of mq</label>
                <input
                    id="mqInput"
                    type="number"
                    class="form-control"
                    min="0"
                    max="5000"
                    v-model="store.mq"
                    @input="setAdvancedFilter(store.num_rooms, store.num_beds, store.num_baths, store.mq, store.price)"
                    placeholder="Input the mq">
            </div>
        </div>

            <!-- Filtro per prezzo -->
            <div class="mb-3">
                <label for="priceInput" class="form-label fw-bold">Price</label>
                <input
                    id="priceInput"
                    type="number"
                    class="form-control"
                    min="0"
                    max="1000000"
                    v-model="store.price"
                    @input="setAdvancedFilter(store.num_rooms, store.num_beds, store.num_baths, store.mq, store.price, store.selectedServices)"
                    placeholder="Input the price">
            </div>
            <div class="mb-3">
                <label for="servicesCheckbox" class="form-label fw-bold">Services</label>
                <div v-for="service in services" :key="service.id" class="form-check">
                    <input
                        type="checkbox"
                        class="form-check-input"
                        :id="'service-' + service.id"
                        :value="service.id"
                        v-model="store.selectedServices"
                        @change="setAdvancedFilter(store.num_rooms, store.num_beds, store.num_baths, store.mq, store.price, store.selectedServices)">
                    <label class="form-check-label" :for="'service-' + service.id">{{ service.name }}</label>
                </div>
            </div>

            <!-- Pulsante per rimuovere i filtri -->
            <button
                class="btn btn-custom w-100 mt-4"
                @click="resetFilters">
                <strong>Remove all filters</strong>
            </button>
            <button type="button" class="btn btn-custom-two w-100 mt-4" data-bs-dismiss="offcanvas"><strong>See Results</strong></button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.filter-list {
    display: flex;
    align-items: center;
    justify-content: flex-start; // Cambia da "center" a "flex-start" per evitare di nascondere gli elementi iniziali
    list-style: none;
    overflow-x: auto;
    padding: 0;
    margin: 0;
    scrollbar-width: none;  /* Nasconde la scrollbar in Firefox */
    -webkit-overflow-scrolling: touch; // Aggiungi per supporto su iOS
}

.filter-list::-webkit-scrollbar {
    display: none; /* Nasconde la scrollbar in Chrome, Safari e Edge */
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

.offcanvas {
    text-align: center;
    color: #f7ede2;
    background: linear-gradient(360deg, #192033, #49919d);
    padding: 20px;
    border: none;
    .btn-custom{
        color: #f7ede2;
        background: linear-gradient(45deg, #ce6a6c, #ebada2);
        border-radius: 10px;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover{
            transform: scale(1.05);
        }
    }
    .btn-custom-two{
        color: #f7ede2;
        background: linear-gradient(250deg, #ce6a6c, #ebada2);
        border-radius: 10px;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover{
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
.form-control{
    background-color: #f7ede2;
}
</style>
