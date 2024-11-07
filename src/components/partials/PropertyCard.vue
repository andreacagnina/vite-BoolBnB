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
    <div class="col-sm-12 col-md-4 col-lg-2 py-3 px-2">
        <div class="card">
            <router-link class="text-reset text-decoration-none" :to="{ name: 'property', params: { slug: property.slug } }">

                <div class="card-img-top">
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
                </div>

                <div class="card-body">
                    <h3>{{ property.title }}</h3>
                    <p>{{ property.address }}</p>
                    <p><strong>Weekly price: </strong>{{ property.price }} &#8364</p>
                </div>

            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../styles/partials/partials.scss";
.card-img-top img {
    height: 300px;
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
}
.card{
    border: none;
    background-color: transparent;
    &:hover{
        transform: scale(1.05);
        transition: all 0.3s ease-in-out;
        cursor: pointer;
    }
    .card-body{
    padding: 10px;
    height: 150px;
    overflow: scroll;
    h3{
        font-weight: bolder;
        font-size: 1.1rem;
        color: $text-color;
    }
    p{
        font-size: 0.9rem;
        margin: 0px 0px 10px 0px;
        color: $text-color;
    }
    }
}
/* Su dispositivi mobile (fino a 767px) */
@media screen and (max-width: 767px) {
    .card-img-top img {
    height: 300px;
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
}
.card{
    border: none;
    background-color: transparent;
    &:hover{
        transform: scale(1);
        transition: all 0.3s ease-in-out;
        cursor: pointer;
    }
    .card-body{
    padding: 10px;
    height: 100px;
    h3{
        font-weight: bolder;
        font-size: 1.1rem;
        color: $text-color;
    }
    p{
        font-size: 0.9rem;
        margin: 0px 0px 10px 0px;
        color: $text-color;
    }
    }
}
}
/* Su dispositivi tablet (da 768px a 991px) */
@media screen and (min-width: 768px) and (max-width: 991px) {
    
}
</style>