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
                console.log(this.properties); 
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
    <div>
        <div class="container-fluid">

            <div class="row">

                <div class="col-sm-12">

                    <div class="square-c d-flex justify-content-center align-items-center">filtro</div>

                </div>

            </div>

            <div class="row g-3">

                <PropertyCard v-for="property in properties" :key="property.id" :property="property"/>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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