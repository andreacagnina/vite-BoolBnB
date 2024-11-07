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
            current_page: null,
        }
    },

    created() {
        this.getProperties();
    },

    methods: {
        getProperties(){
            axios.get(`${store.baseUrl}/properties`).then((response) =>{
                this.properties = response.data.results.data;
                this.last_page = response.data.results.last_page;
                this.current_page = response.data.results.current_page;
            });
        },

        goToPage(page){
            axios.get(`${store.baseUrl}/properties`, {params: {page: page}}).then((response) =>{
                this.properties = response.data.results.data;
                this.current_page = response.data.results.current_page;
            });
        },

    },
}
</script>

<template>
    <section class="homepage">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <div class="square-c d-flex justify-content-center align-items-center">filtro</div>
                </div>
            </div>
            <div class="row g-3">
                <PropertyCard v-for="property in properties" :key="property.id" :property="property"/>
            </div>
            <div class=row>
                <div class="col-12">
                    <nav aria-label="Page navigation example"  class="d-flex justify-content-center py-3">
                        <ul class="pagination">  
                            <li class="page-item"><a class="page-link" :class="current_page == 1 ? 'disabled' : ''" href="#" @click="goToPage(current_page - 1)">Previous</a></li>
                            <li class="page-item" v-for="index in last_page"><a class="page-link" href="#" @click="goToPage(index)">{{ index }}</a></li>
                            <li class="page-item"><a class="page-link" :class="current_page == last_page ? 'disabled' : ''" href="#" @click="goToPage(current_page + 1)">Next</a></li>
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
    
    .square {
        height: 100px;
        width: 100%;
        background-color: rgb(0, 255, 106);
    }

    .square-b {
        height: 100px;
        width: 100%;
        background-color: rgb(0, 17, 255);
    }

    .square-c {
        height: 100px;
        width: 100%;
        background-color: rgb(208, 255, 0);
    }
</style>