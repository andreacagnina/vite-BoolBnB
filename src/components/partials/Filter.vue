<script>
import { store } from '../../store';

export default {
    name: 'Filter',
    props: ['propertyTypes'],
    setup() {
        // filtro type
        const setFilter = (type) => {
            store.filterType = type;
            store.current_page = 1;
        };

        // filtro num_rooms
        const setRoomsFilter = (numRooms) => {
            store.num_rooms = numRooms;
            store.current_page = 1;
        };

        return { store, setFilter, setRoomsFilter };
    },
};
</script>
<template>
    <div class="col-sm-12 col-lg-12">
        <div class="d-flex justify-content-center align-items-center mb-4">
            <!-- Filtro type -->
            <ul class="filter-list">
                <li @click="setFilter('')" :class="{ active: store.filterType === '' }">Tutti</li>
                <li v-for="type in propertyTypes"
                    :key="type"
                    @click="setFilter(type)"
                    :class="{ active: store.filterType === type }">
                    {{ type }}
                </li>
            </ul>
    
            <!-- Bottone Offcanvas -->
            <button class="btn btn-filter ms-4" data-bs-toggle="offcanvas" data-bs-target="#roomsOffcanvas" aria-controls="roomsOffcanvas">
                Filter
            </button>
        </div>
    </div>

    <!-- Offcanvas per il filtro avanzato -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="roomsOffcanvas" aria-labelledby="roomsOffcanvasLabel" data-bs-scroll="true">
        <div class="offcanvas-header">
            <h5 id="roomsOffcanvasLabel">Rooms</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <!-- num_rooms options -->
            <ul class="list-group">
                <li class="list-group-item" @click="setRoomsFilter('')" :class="{ active: store.num_rooms === '' }">Not Selected</li>
                <li class="list-group-item" v-for="i in 6" :key="i" @click="setRoomsFilter(i)" :class="{ active: store.num_rooms === i }">
                    {{ i }}
                </li>
                <li class="list-group-item" @click="setRoomsFilter('7')" :class="{ active: store.num_rooms >= 7 }">7+</li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
    
    &:hover {
        transform: scale(1.05);
    }
}

.list-group-item.active {
    background-color: #f7ede2;
    color: #333;
    font-weight: bold;
}

.btn-filter {
    background: linear-gradient(360deg,  #49919d, #84a59d);
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.05);
    }
}
</style>
