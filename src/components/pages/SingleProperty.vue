<script>
import { store } from '../../store';
import axios from 'axios';

export default {
    data() {
        return {
            store,
            isModalVisible: false,
            isLoading: true,
            form: {
                firstName: '',
                lastName: '',
                email: '',
                message: '',
            },
            isMessageSent: false,
            showMessageClass: '',
            currentImageIndex: 0, // Indice per l'immagine attiva nel carosello
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
        getProperty() {
            const slug = this.$route.params.slug;
            this.isLoading = true;

            axios.get(`${store.baseUrl}/property/${slug}`)
                .then(response => {
                    if (response.data && response.data.results) {
                        store.property = response.data.results;
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
        submitForm() {
            if (this.isValidForm()) {
                this.isLoading = true;

                axios.post(`${store.baseUrl}/messages`, {
                    first_name: this.form.firstName,
                    last_name: this.form.lastName,
                    email: this.form.email,
                    message: this.form.message,
                    property_id: store.property.id,
                })
                .then(response => {
                    this.isMessageSent = true;
                    this.showMessageClass = 'message-shown';

                    this.form.firstName = '';
                    this.form.lastName = '';
                    this.form.email = '';
                    this.form.message = '';

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
        isValidForm() {
            if (!this.form.email || !this.form.message) {
                alert("Tutti i campi sono obbligatori!");
                return false;
            }
            return this.validateEmail(this.form.email);
        },
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
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
            <!-- Immagine principale (immagine attiva selezionata) -->
            <div class="col-md-7">
                <img :src="currentImage.path" alt="Main Property Image" class=" img-fluid main-image rounded-4">
            </div>

            <!-- Immagini aggiuntive (layout 2x2) -->
            <div class="col-md-5">
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

        <!-- Bottoni per scorrere le immagini -->
        <div class="d-flex justify-content-center mt-2">
            <button @click="prevImage" class="btn btn-secondary mx-1">Previous</button>
            <button @click="nextImage" class="btn btn-secondary mx-1">Next</button>
        </div>
    </div>
    
        
    <div class="container">
        <div class="row">
            <!-- Colonna per la descrizione della proprietà -->
            <div class="col-8">
                <div v-if="!isLoading">
                    <div class="text-center">
                        <h3>Description</h3>
                        <p>{{ store.property.description }}</p>
                        <h3>Price</h3>
                        <p>{{ store.property.price }} €</p>
                        <h3>Address</h3>
                        <p>{{ store.property.address }}</p>
                    </div>
                </div>
            </div>
            
            <!-- Colonna per il form di contatto -->
            <div class="col-4 text-center">
                <h3>Contact</h3>
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label for="firstName" class="form-label">First Name</label>
                        <input type="text" class="form-control" v-model="form.firstName" id="firstName"
                            placeholder="Enter your first name" :disabled="isLoading" />
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">Last Name</label>
                        <input type="text" class="form-control" v-model="form.lastName" id="lastName"
                            placeholder="Enter your last name" :disabled="isLoading" />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" v-model="form.email" id="email"
                            placeholder="Enter your email" :disabled="isLoading" required />
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">Message</label>
                        <textarea class="form-control" v-model="form.message" id="message" rows="3"
                            placeholder="Enter your message" :disabled="isLoading" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" :disabled="isLoading">
                        <span v-if="isLoading">Sending...</span>
                        <span v-else>Send</span>
                    </button>
                </form>
    
                <!-- Messaggio di successo -->
                <div v-if="isMessageSent" :class="['success-message', showMessageClass]">
                    <div class="d-flex align-items-center">
                        <!-- Icona di successo -->
                        <i class="fa-solid fa-check"></i>
                        <p class="ms-3 mb-0">Messaggio inviato con successo!</p>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- Sezione della mappa -->
        <div class="row">
            <div class="col-12">
                <h2 class="text-center">Map</h2>
            </div>
            <div class="col-12 d-flex justify-content-center">
                <div class="square">
                    <p>MILANO</p>
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
}

.prev, .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
}

.prev {
    left: -10px;
}

.next {
    right: -10px;
}

.small-image.active {
    border: 2px solid #49919d;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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
    .fa-check{
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
h2,
h3,
p,
label {
    color: #f7ede2;
}

.square {
    width: 500px;
    height: 500px;
    background-color: #49919d;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 10px;
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
