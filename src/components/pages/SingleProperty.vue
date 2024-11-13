<script>
import { store } from '../../store';
import axios from 'axios';
import TomTomMap from '../partials/TomTomMap.vue';

export default {
    components: { TomTomMap },
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
        };
    },
    created() {
        this.getProperty();
    },
    computed: {
        currentImage() {
            return this.images[this.currentImageIndex];
        },
        visibleSmallImages() {
            // Ottieni un array con tutte le immagini tranne quella attualmente selezionata
            return this.images.filter((_, index) => index !== this.currentImageIndex).slice(0, 4);
        },
        images() {
            return [{ path: store.property.cover_image }, ...store.property.images];
        },
    },
    methods: {
        // Funzione per recuperare la proprietà
        getProperty() {
            const slug = this.$route.params.slug;
            this.isLoading = true;

            axios.get(`${store.baseUrl}/property/${slug}`)
                .then(response => {
                    if (response.data && response.data.results) {
                        store.property = response.data.results;// Salva nel store

                        this.lat = store.property.lat;
                        this.long = store.property.long;
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
        setCurrentImage(index) {
            this.currentImageIndex = index + 1;  // Compensa l'offset della cover_image
        },
        prevImage() {
            this.currentImageIndex = (this.currentImageIndex === 0)
                ? this.images.length - 1
                : this.currentImageIndex - 1;
        },
        nextImage() {
            this.currentImageIndex = (this.currentImageIndex === this.images.length - 1)
                ? 0
                : this.currentImageIndex + 1;
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center mt-4">
                <h1 class="fw-bold">{{ store.property.title }}</h1>
                <p>{{ store.property.description }}</p>
            </div>
            <!-- Immagine principale (immagine attiva selezionata) -->
            <div class="col-md-7 my-4">
                <img :src="currentImage.path" alt="Main Property Image" class="img-fluid main-image rounded-4">
            </div>

            <!-- Immagini aggiuntive (layout 2x2) -->
            <div class="col-md-5 my-5">
                <div class="small-images d-flex flex-column h-100">
                    <div class="d-flex flex-grow-1">
                        <img 
                            v-for="(image, index) in visibleSmallImages" 
                            :key="image.id" 
                            :src="image.path" 
                            alt="Additional Property Image" 
                            class="img-fluid w-50 small-image m-1 rounded-4"
                            @click="setCurrentImage(index)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- DETAILS -->
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div v-if="!isLoading">
                        <div class="col-12 my-4 text-center">
                            <h2 class="fw-bold">Info & Details</h2>
                            <div class="price">
                                <h5 class="fw-bold">Weekly Price:</h5>
                                <p class="ms-2">{{ store.formatPrice(store.property.price) }}</p>
                            </div>
                            <ul class="list-unstyled d-flex text-light">
                                <li v-for="service in store.property.services" :key="service.id">
                                    <span class="pe-1">
                                        <strong><i :class="service.icon" class="me-1"></i></strong>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 mb-5">
                <div class="row gx-5">
                    <div class="col-12 mt-5">
                        <h2 class="fw-bold">Here’s where you can find us!</h2>
                        <p>{{ store.property.address }}</p>
                    </div>
                    <div class="col-8 d-flex justify-content-center mb-4">
                        <TomTomMap v-if="lat && long" :lat="lat" :long="long" />
                    </div>
                    <div class="col-4 text-center">
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
                                <label for="email" class="form-label">Email address</label>
                                <input type="email" class="form-control" v-model="form.email" id="email"
                                    placeholder="Enter your email" :disabled="isLoading" required />
                            </div>
                            <div class="mb-2">
                                <label for="message" class="form-label">Message</label>
                                <textarea class="form-control" v-model="form.message" id="message" rows="3"
                                    placeholder="Enter your message" :disabled="isLoading" required></textarea>
                            </div>
                            <button type="submit" class="btn-custom w-100 mt-2" :disabled="isLoading">
                                <span v-if="isLoading">Sending Message...</span>
                                <span v-else>Send Message</span>
                            </button>
                            <!-- Messaggio di successo -->
                        <div v-if="isMessageSent" :class="['success-message', showMessageClass]">
                            <div class="d-flex align-items-center">
                                <!-- Icona di successo -->
                                <i class="fa-solid fa-check"></i>
                                <p class="ms-3 mb-0">Messaggio inviato con successo!</p>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
</template>


<style lang="scss" scoped>
.main-image {
    height:550px;
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
    h5, p {
        display: inline-block;
    }
}

.btn-custom{
    color: #f7ede2;
    background: linear-gradient(45deg, #ce6a6c, #ebada2);
    border-radius: 10px;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover{
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
h5,
p,
label {
    color: #f7ede2;
    &:hover {
        background: linear-gradient(45deg, #ce6a6c, #ebada2);
        -webkit-background-clip: text;
        color: transparent;
    }
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
</style>
