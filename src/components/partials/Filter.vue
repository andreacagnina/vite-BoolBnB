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
        const setRoomsFilter = (numRooms) => {
            store.num_rooms = numRooms;
            store.current_page = 1;
        };

        // filtro num_beds
        const setBedsFilter = (numBeds) => {
            store.num_beds = numBeds;
            store.current_page = 1;
        };

        // Funzione per resettare tutti i filtri
        const resetFilters = () => {
            store.filterType = '';
            store.num_rooms = '';
            store.num_beds = '';
            store.current_page = 1;
        };

        return { store, setFilter, setRoomsFilter, setBedsFilter, resetFilters };
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
            <h5 id="roomsOffcanvasLabel">Filtri</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <!-- Filtro per numero di stanze -->
            <div class="mb-3">
                <label for="numRoomsInput" class="form-label">Numero di stanze</label>
                <input
                    id="numRoomsInput"
                    type="number"
                    class="form-control"
                    min="1"
                    v-model="store.num_rooms"
                    @input="setRoomsFilter(store.num_rooms)"
                    placeholder="Inserisci il numero di stanze">
            </div>
            
            <!-- Filtro per numero di letti -->
            <div class="mb-3">
                <label for="numBedsInput" class="form-label">Numero di letti</label>
                <input
                    id="numBedsInput"
                    type="number"
                    class="form-control"
                    min="1"
                    v-model="store.num_beds"
                    @input="setBedsFilter(store.num_beds)"
                    placeholder="Inserisci il numero di letti">
            </div>
    
            <!-- Pulsante per rimuovere i filtri -->
            <button
                class="btn btn-secondary w-100 mt-4"
                @click="resetFilters">
                Rimuovi tutti i filtri
            </button>
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

.offcanvas-header, .offcanvas-body {
    text-align: center;
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
</style>
