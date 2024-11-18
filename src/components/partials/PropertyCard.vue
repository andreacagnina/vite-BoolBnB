<script>
import { store } from "../../store";

export default {
    name: "PropertyCard",

    props: {
        property: Object,
    },

    data() {
        return {
            store,
        };
    },
};

</script>


<template>
<div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 ">

    <div class="card">

        <span v-if="property.sponsored" class="badge-sponsor"><i class="fa-solid fa-crown"></i>SPONSORED</span>
            
        <router-link class="text-reset text-decoration-none"
        :to="{ name: 'property', params: { slug: property.slug } }">
            
            <div class="card-img" >
                <!-- Carosello di immagini -->
                <div class="carousel slide" :id="'carousel-' + property.id">

                    <div class="carousel-inner">
                        <!-- Cover img -->
                        <div class="carousel-item active position-relative">
                            <img class="img-fluid" :src="property.cover_image"  alt="Cover Image" >
                            <div class="position-absolute top-custom start-50" id="marker"></div>
                        </div>

                        <!-- Immagini aggiuntive dalla tabella 'images' -->
                        <div class="carousel-item" v-for="image in property.images" :key="image.id">
                            <img class="img-fluid" :src="image.path"  alt="Property Image">
                        </div>
                    </div>
                    
                    <!-- Controlli del carosello -->
                    <button class="carousel-control-prev" type="button" :data-bs-target="'#carousel-' + property.id"
                    data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    
                    <button class="carousel-control-next" type="button" :data-bs-target="'#carousel-' + property.id"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>

                </div>
            </div>
            
            <div class="card-body">
                
                <h3 class="text-truncate">{{ property.title }}</h3>
                <p class="text-truncate">{{ property.address }}</p>
                <ul class="list-unstyled d-flex justify-content-around" v-if="property.services">
                    <li v-for="service in property.services" :key="service.id">
                        <i :class="service.icon" v-tooltip:top :title="service.name" class="icon-custom"></i>
                    </li>
                </ul>
                <p><strong>Weekly price: </strong>{{ store.formatPrice(property.price) }}</p>
                
            </div>
            
        </router-link>
    </div>
</div>
</template>


<style lang="scss" scoped>
    @import "../../styles/partials/partials.scss";

    .top-custom {
        top: 70%;
    }

    @media (max-width: 992px) {
        .top-custom {
            top: 60%;
        }
    }

.card-img {
    overflow: hidden;
    border-radius: 15px;
    
    img {
        height: 280px;
        width: 100%;
        object-fit: cover;
        border-radius: inherit;
        transition: transform 0.3s ease-in-out;
    }

    &:hover img {
        transform: scale(1.05);
    }
}

.badge-sponsor {
    position: absolute;
    top: 2.5%;
    left: 4%;
    background-color: #f6bd60;
    color: #192033;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 5px 20px 5px 10px;
    border-radius: 15px;
    z-index: 1;

    .fa-crown {
        font-size: 0.8rem;
        color: #192033;
        margin: 0 5px;
    }
    
}

.card {
    border: none;
    background-color: transparent;
    $text-color: #f7ede2;

    &:hover {
        cursor: pointer;
    }

    .card-body {
        padding: 10px;
        flex-grow: 1;
        color: $text-color;

        h3 {
            font-weight: bold;
            font-size: 1.1rem;
            color: $text-color;
        }

        p {
            font-size: 0.9rem;
            margin: 0 0 10px;
            color: $text-color;
        }
        
    }

    .icon-custom:hover {
        background: linear-gradient(45deg, #f6bd60, #ce6a6c);
        background-clip: text;
        color: transparent;
        transition: all 0.1s ease-in-out;

    }
    
}

// CAROSELLO
.carousel {
    // Bottoni prev e next
    &-control-prev,
    &-control-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.695);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.2s ease;
        z-index: 1;
        pointer-events: none;
        margin: 0 7px;

        // Mostra i bottoni quando si passa con il mouse sul carosello
        .carousel:hover & {
            opacity: 1;
            pointer-events: auto;
        }

        // Effetto hover sui bottoni
        &:hover {
            transform: translateY(-50%) scale(1.1);
        }

        // Stile delle icone
        &-icon {
            width: 1rem;
            height: 1rem;
            background-size: contain;
        }

    }

}

</style>