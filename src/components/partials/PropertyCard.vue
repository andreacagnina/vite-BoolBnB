<script>
export default {
    name: 'PropertyCard',
    props: {
        property: Object
    },
    methods: {
        
    }
}
</script>

<template>
    <div class="col-sm-12 col-md-3 col-lg-2">
        <div class="card h-100">
            <router-link class="text-reset text-decoration-none" :to="{ name: 'property', params: { slug: property.slug } }">

                <!-- Carosello di immagini -->
                <div id="carousel-{{ property.id }}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <!-- Cover come prima immagine del carosello -->
                        <div class="carousel-item active">
                            <img :src="property.cover_image" class="d-block w-100" alt="Cover Image">
                        </div>

                        <!-- Le immagini aggiuntive provenienti dalla tabella 'images' -->
                        <div v-for="image in property.images" :key="image.id" class="carousel-item">
                            <img :src="image.image_url" class="d-block w-100" alt="Property Image">
                        </div>
                    </div>

                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-{{ property.id }}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel-{{ property.id }}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

                <div class="card-body">
                    <h3>{{ property.title }}</h3>
                </div>

            </router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card-img-top {
    height: 200px; 
    object-fit: cover;
}
</style>