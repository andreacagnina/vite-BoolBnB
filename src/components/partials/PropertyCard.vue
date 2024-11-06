<script>
export default {
    name: 'PropertyCard',
    props:{
        property: Object
    }, 

    methods: {

    },
}
</script>

<template>
    <div class="col-sm-12 col-md-6 col-lg-3">
        <div class="card h-100">

            <div class="card_img">
                <img class="card-img-top img-fluid" :src="property.cover_image != null ? `http://127.0.0.1:8000/storage/${property.cover_image}` : 'https://placehold.co/600x400?text=Hello+World'">
            </div>

            <div class="card-body">

                <h3>{{ property.title }}</h3>

            </div>

        </div>

    </div>
</template>

<style lang="scss">
    
</style>