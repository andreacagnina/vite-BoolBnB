<script>
export default {
    name: 'PropertyCard',
    props: {
        property: Object
    },

    methods: {
        formatPrice(price) {
            return price.toFixed(2);
        }
    }
};
</script>

<template>
    <div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3 px-2 my-3">
        <div class="card h-100 d-flex flex-column">
            <span v-if="property.sponsored" class="badge-sponsor"><i class="fa-solid fa-crown"></i>SPONSORED<i class="fa-solid fa-crown"></i></span>

            
            <router-link class="text-reset text-decoration-none h-100 d-flex flex-column" :to="{ name: 'property', params: { slug: property.slug } }">
            
                <div class="card-img-top">
                    <!-- Carosello di immagini senza scorrimento automatico -->
                    <div :id="'carousel-' + property.id" class="carousel slide">
                        <div class="carousel-inner">
                            <!-- Cover come prima immagine del carosello -->
                            <div class="carousel-item active">
                                <img :src="property.cover_image" class="d-block w-100" alt="Cover Image">
                            </div>

                            <!-- Immagini aggiuntive dalla tabella 'images' -->
                            <div v-for="image in property.images" :key="image.id" class="carousel-item">
                                <img :src="image.path" class="d-block w-100" alt="Property Image">
                            </div>
                        </div>

                        <!-- Controlli del carosello -->
                        <button class="carousel-control-prev" type="button" :data-bs-target="'#carousel-' + property.id" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" :data-bs-target="'#carousel-' + property.id" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div class="card-body d-flex flex-column mt-auto">
                    <h3>{{ property.title }}</h3>
                    <p>{{ property.address }}</p>
                    <ul class="list-unstyled d-flex" v-if="property.services">
                        <li v-for="service in property.services" :key="property.id">
                            <span class="pe-1"><strong>
                                <i :class="service.icon" class="me-1"></i>
                            </strong></span>
                        </li>
                    </ul>
                    <p class="mt-auto"><strong>Weekly price: </strong>{{ formatPrice(property.price) }} &#8364</p>
                </div>
            
            </router-link>
        
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../styles/partials/partials.scss";

.card-img-top img {
    height: 280px;
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
}

.card {
    border: none;
    background-color: transparent;
    
    &:hover {
        transform: scale(1.05);
        transition: all 0.3s ease-in-out;
        cursor: pointer;
    }

    .card-body {
        padding: 10px;
        height: 150px;
        overflow: hidden;

        h3 {
            font-weight: bolder;
            font-size: 1.1rem;
            color: $text-color;
        }

        p {
            font-size: 0.9rem;
            margin: 0 0 10px;
            color: $text-color;
        }
    }
    .badge-sponsor {
        position: absolute;
        top: 0px;
        right: 0px;
        background-color: #f6bd60;
        color: #192033 ;
        font-size: 0.8rem;
        font-weight: bold;
        padding: 5px 10px;
        border-radius: 5px;
        z-index: 1;
        .fa-crown{
            color: #192033;
            font-size: 0.8rem;
            margin: 0 5px;
        }
    }
    i {
        color: #f7ede2;
    }
}


/* Su dispositivi mobile (fino a 767px) */
@media screen and (max-width: 767px) {
    .card-img-top img {
        height: 300px;
    }

    .card:hover {
        transform: scale(1);
    }

    .card-body {
        height: 100px;

        h3 {
            font-weight: bolder;
            font-size: 1.1rem;
        }

        p {
            font-size: 0.9rem;
        }
    }
}

/* Su dispositivi tablet (da 768px a 991px) */
@media screen and (min-width: 768px) and (max-width: 991px) {
    /* Stili personalizzati per tablet (se necessario) */
}
</style>
