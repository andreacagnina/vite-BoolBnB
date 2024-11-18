<script>
import { store } from '../../store';
import axios from 'axios';
import TomTomMap from '../partials/TomTomMap.vue';
import Loader from '../partials/Loader.vue';

export default {
    components: { TomTomMap, Loader, },
    data() {
        return {
            store,
            isModalVisible: false,  // Stato per mostrare/nascondere la modale
            isLoading: true,        // Stato per gestire il caricamento
            form: {
                firstName: '',
                lastName: '',
                email: '',
                message: '',
            },
            isMessageSent: false,  // Stato per mostrare il messaggio di successo
            showMessageClass: '',  // Classe per gestire l'animazione del messaggio
            lat: null,
            long: null,
            currentImageIndex: 0,  // indice dell'immagine attualmente visualizzata

            isFavorite: window.isFavorite, // Inizializza con il valore fornito dal backend
            isLoadingFavorite: false,
            loadingPage:true

        };
    },
    created() {
        this.getProperty();
    },
    computed: {
        currentImage() {
            return this.images[this.currentImageIndex];//Imposta l'inidce l'immagine attualmente visualizzata al valore di currentImageIndex(0)
        },
        images() {
            return [{ path: store.property.cover_image }, ...store.property.images]; //Unisce la cover image con le altre immagini di property
        },
    },
    methods: {
        // Funzione per recuperare la proprietà
        getProperty() {
            const slug = this.$route.params.slug;
            this.loadingPage = true;

            axios.get(`${store.baseUrl}/property/${slug}`)
                .then(response => {
                    if (response.data && response.data.results) {
                        store.property = response.data.results; // Salva nel store

                        this.lat = store.property.lat;
                        this.long = store.property.long;

                        // Imposta lo stato iniziale di isFavorite
                        this.isFavorite = response.data.results.is_favorite || false;
                        this.loadingPage = false;
                    } else {
                        console.error("Dati non validi ricevuti:", response);
                    }
                })
                .catch(error => {
                    console.error("Errore nel recupero della proprietà:", error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        // Funzione per inviare il form
        submitForm() {
            if (this.isValidForm()) {
                this.isLoading = true;

                axios.post(`${store.baseUrl}/messages`, {
                    first_name: this.form.firstName,
                    last_name: this.form.lastName,
                    email: this.form.email,
                    message: this.form.message,
                    property_id: store.property.id,  // ID della proprietà corrente

                })
                    .then(response => {
                        this.isMessageSent = true;
                        this.showMessageClass = 'message-shown';

                        // Reset dei campi del form
                        this.form.firstName = '';
                        this.form.lastName = '';
                        this.form.email = '';
                        this.form.message = '';

                        // Nascondi il messaggio di successo dopo 3 secondi
                        setTimeout(() => {
                            this.showMessageClass = 'message-hidden';
                            setTimeout(() => {
                                this.isMessageSent = false;
                                this.showMessageClass = '';
                            }, 500);
                        }, 3000);
                    })
                    .catch(error => {
                        console.error("Errore nell'invio del messaggio:", error);
                        alert("C'è stato un errore nell'invio del messaggio. Riprova.");
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            }
        },

        // Funzione per validare il form
        isValidForm() {
            if (!this.form.email || !this.form.message) {
                alert("Tutti i campi sono obbligatori!");
                return false;
            }
            return this.validateEmail(this.form.email);
        },

        // Funzione di validazione email
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        // Funzione per mostrare/nascondere la modale
        toggleModal() {
            this.isModalVisible = !this.isModalVisible;
        },

        // Funzione per scambiare le immagini del carosello
        swapImages(index) {
            const imagesCopy = [...this.images]; //Creazione di una copia dell'array delle immagini
            const temp = imagesCopy[0]; //Salvataggio temporaneo della cover image
            imagesCopy[0] = imagesCopy[index + 1]; // Scambio dell'immagine con indice 0 con l'immagine selezionata

            imagesCopy[index + 1] = temp; //L'image viene inserita nella posizione da cui è stata prelevata l'immagine selezionata, ossia nella posizione index + 1

            // Aggiorna l'array delle immagini nel store
            store.property.cover_image = imagesCopy[0].path;
            store.property.images = imagesCopy.slice(1).map(image => ({ path: image.path }));
        },
        toggleFavorite() {
            this.isLoadingFavorite = true;

            // Invio della richiesta al backend
            axios.post(`${store.baseUrl}/properties/${store.property.id}/favorite`)
                .then(response => {
                    if (response.data.success) {
                        this.isFavorite = !this.isFavorite; // Aggiorna lo stato
                    }

                })
                .catch(error => {
                    console.error("Errore durante l'aggiornamento del preferito:", error);
                    alert("Errore durante l'aggiornamento del preferito. Riprova più tardi.");
                })
                .finally(() => {
                    this.isLoadingFavorite = false;
                });
        },

    }
}
</script>


<template>
    <section class="h-100 " v-if="loadingPage">
        <Loader  />
    </section>
    <section v-else class="mt-cust">
    <div class="custom-container">
        <div class="row">
            <div class="col-12 text-center mt-4">
                <h1 class="fw-bold">{{ store.property.title }}</h1>
                <p>{{ store.property.description }}</p>
            </div>

            <!-- Immagine principale (immagine attiva selezionata) -->
            <div class="col-12 col-lg-7 my-4 position-relative">
                <img :src="currentImage.path" alt="Main Property Image" class="img-fluid main-image rounded-4">
                <button @click="toggleFavorite" class="btn position-absolute top-0 start-0 ms-3 fs-1 border-0"
                    :disabled="isLoadingFavorite">
                    <i v-if="this.isFavorite" class="fa-solid fa-heart" style=" color: #ff0000;"></i><i v-else
                        class="fa-regular fa-heart" style=" color: #ff0000;"></i>
                </button>
            </div>

            <!-- Immagini aggiuntive (layout 2x2) -->
            <div class="col-12 col-lg-5 my-5">
                <div class="small-images d-flex flex-column h-100">
                    <div class="d-flex flex-grow-1">
                        <img v-for="(image, index) in store.property.images" :key="image.id" :src="image.path"
                            alt="Additional Property Image" class="img-fluid w-50 small-image m-1 rounded-4"
                            @click="swapImages(index)" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- DETAILS -->
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-12">
                <div v-if="!isLoading">
                    
                    <div class="row">

                        
                        <div class="col-12">
                            <div class="d-flex align-items-center justify-content-center">
                            
                                <h4 class="fw-bold pe-2">Weekly</h4>
                                <p class="fw-bold fs-4">{{ store.formatPrice(store.property.price) }}</p>
                                
                            </div>
                            <hr>
                        </div>
                        <div class="col-sm-6 col-md-12">

                            <h3 class="fw-bold d-flex justify-content-center pb-2 text-s mt-3">Details</h3>
                            <div class="ul list-unstyled d-flex justify-content-center sm-column mb-3">

                                <li>
                                    <p>Rooms <span  class="fs-3 ms-1 fw-bold">{{ store.property.num_rooms }}</span></p>
                                </li>
                                <li>
                                    <p class="ms-cust">Beds <span  class="fs-3 ms-1 fw-bold">{{ store.property.num_beds }}</span></p>
                                </li>
                                <li>
                                    <p class="ms-cust">Bathrooms <span  class="fs-3 ms-1 fw-bold">{{ store.property.num_baths }}</span></p>
                                </li>
                                <li>
                                    <p class="ms-cust">m<sup>2</sup> <span  class="fs-3 ms-1 fw-bold">{{ store.property.mq }}</span></p>
                                </li>
                            </div>

                        </div>
                        
                        <div class="col-sm-6 col-md-12 ">
                            
                            <h3 class="fw-bold d-flex justify-content-center pb-3 text-s mt-3">Services</h3>
                            <ul class="list-unstyled d-flex justify-content-center sm-column mb-3">
                                <li v-for="service in store.property.services" :key="service.id"
                                    class="d-flex text-nowrap">
                                    <div class="icon-line pe-4 ms-1">
                                        <span class="">
                                            {{ service.name }}
                                        </span>
                                        <i :class="service.icon" class="ms-2 icon-custom"></i>
                                    </div>
                                </li>
                            </ul>

                        </div>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 mb-5">
            
            <div class="row gx-5">
                <div class="col-12 col-md-7 col-lg-8 mt-5 text-center">
                    <h2 class="fw-bold">Here’s where you can find us!</h2>
                    <p>{{ store.property.address }}</p>
                </div>
                <div class="col-12 col-md-5 col-lg-4 mt-5 text-center order-sm-last order-md-0">
                    <div v-if="isMessageSent" :class="['success-message', showMessageClass]" class="mb-2">
                        <div class="d-flex align-items-center">
                            <!-- Icona di successo -->
                            <i class="fa-solid fa-check"></i>
                            <p class="ms-3 mb-0">Messaggio inviato con successo!</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-7 col-lg-8 d-flex justify-content-center mb-4">
                    <TomTomMap v-if="lat && long" :lat="lat" :long="long" />
                </div>
                <div class="col-12 col-md-5 col-lg-4 text-center">
                    <!-- Messaggio di successo -->
                    <h2 class="fw-bold">Contact Us!</h2>
                    <form @submit.prevent="submitForm">
                        <div class="mb-2">
                            <label for="firstName" class="form-label">First Name</label>
                            <input type="text" class="form-control" v-model="form.firstName" id="firstName"
                                placeholder="Enter your first name" :disabled="isLoading" />
                        </div>
                        <div class="mb-2">
                            <label for="lastName" class="form-label">Last Name</label>
                            <input type="text" class="form-control" v-model="form.lastName" id="lastName"
                                placeholder="Enter your last name" :disabled="isLoading" />
                        </div>
                        <div class="mb-2">
                            <label for="email" class="form-label">Email address *</label>
                            <input type="email" class="form-control" v-model="form.email" id="email"
                                placeholder="Enter your email" :disabled="isLoading" required />
                        </div>
                        <div class="mb-2">
                            <label for="message" class="form-label">Message *</label>
                            <textarea class="form-control" v-model="form.message" id="message" rows="3"
                                placeholder="Enter your message" :disabled="isLoading" required></textarea>
                        </div>
                        <p class="text-start">Required fields (*)</p>
                        <button type="submit" class="btn-custom w-100 mt-2" :disabled="isLoading">
                            <span v-if="isLoading">Sending Message...</span>
                            <span v-else>Send Message</span>
                        </button>

                    </form>
                </div>
            </div>
        </div>

    </div>
</section>
</template>


<style lang="scss" scoped>

.custom-container {
    max-width: 100%;
    margin: 50px auto 0px auto;
    padding: 0px 75px;
}

.mt-cust {
    margin-top: 87px;
}

section.h-100 {
    display: flex;
    justify-content: center;
    align-items: center;
}

hr {
    color: #f7ede2;
    border: 1.5px solid #f7ede2;
}

.card {
    border: none;
    background-color: transparent;
}

.icon-line {
    color: #f7ede2;
}

.icon-custom {
    width: 30px;
    height: 30px;
    font-size: 1.5rem;
    color: #f7ede2;
    margin: 0px 0px 15px 0px;

    &:hover {
        background: linear-gradient(45deg, #f6bd60, #ce6a6c);
        background-clip: text;
        color: transparent;
        transform: scale(1.15);
        transition: all 0.3s ease-in-out;
    }
}



.align-price {
    font-size: 1.2rem;
    color: #f7ede2;


    &:hover {
        background: linear-gradient(45deg, #f6bd60, #ce6a6c);
        background-clip: text;
        color: transparent;
        transform: scale(1.05);
        transition: all 0.3s ease-in-out;
    }

}

.main-image {
    height: 550px;
    width: 100%;
    object-fit: cover;
}

.small-images {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
}

.small-image {
    object-fit: cover;
    cursor: pointer;
    border: 2px solid transparent;
    opacity: 0.7;

    &:hover {
        transform: scale(1.05);
        transition: all 0.3s ease-in-out;
        opacity: 1;
    }
}

.price {

    h5,
    p {
        display: inline-block;
    }
}

.btn-custom {
    color: #f7ede2;
    background: linear-gradient(45deg, #ce6a6c, #ebada2);
    border-radius: 10px;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
}

/* Messaggio di successo */
.success-message {
    background-color: #49919d;
    color: #f7ede2;
    border-radius: 10px;
    padding: 15px;
    margin-top: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    animation: slideIn 1s ease-out forwards;

    .fa-check {
        color: #f7ede2;
        font-size: 20px;
        margin-right: 10px;
        border-radius: 50%;
        padding: 5px;
        border: 1px solid #f7ede2;
    }
}

.success-message svg {
    margin-right: 10px;
}

/* Animazione di entrata */
@keyframes slideIn {
    0% {
        opacity: 0;
        transform: translateX(-50px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Animazione di uscita */
.message-hidden {
    animation: fadeOut 1s ease-out forwards;
}

@keyframes fadeOut {
    0% {
        opacity: 1;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(20px);
    }
}

/* Stili generali */
h1,
h2,
h3,
h4 {
    color: #f7ede2;

    &:hover {
        background: linear-gradient(45deg, #f6bd60, #ce6a6c);
        background-clip: text;
        color: transparent;
        transform: scale(1.05);
        transition: all 0.3s ease-in-out;
    }
}

p,
label {
    color: #f7ede2;
}

.modal-backdrop {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1050;
    transition: opacity 0.3s ease;
}

.modal-dialog-centered {
    display: flex;
    justify-content: center;
}

/* Messaggio di errore */
.error-message {
    background-color: #f44336;
    /* Rosso per l'errore */
    color: #f7ede2;
    border-radius: 10px;
    padding: 15px;
    margin-top: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    animation: slideIn 1s ease-out forwards;
}

.ms-cust {
    margin-left: 40px;
}

@media (max-width: 768px) {
    .sm-column {
        flex-direction: column;
        align-items: start;
        justify-content: start;
        margin-left: 20px;
    }

    .ms-cust {
        margin-left: 0px;
    }

    .text-s {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        margin-left: 20px;
        margin-top: 0px;
    }
    
}

@media (max-width: 992px) {
    .custom-container {
        padding: 0px 15px;
    }
}
</style>
