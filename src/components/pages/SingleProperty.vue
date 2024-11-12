<script>
import { store } from '../../store.js';
import axios from 'axios';

export default {
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
        };
    },
    created() {
        this.getProperty();
    },
    methods: {
        // Funzione per recuperare la proprietà
        getProperty() {
            const slug = this.$route.params.slug;
            this.isLoading = true;  // Imposta lo stato di caricamento

            axios.get(`${store.baseUrl}/property/${slug}`)
                .then(response => {
                    // Assicurati che i dati siano nel formato giusto
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
                    this.isLoading = false;  // Fine del caricamento
                });
        },

        // Funzione per mostrare/nascondere la modale
        toggleModal() {
            this.isModalVisible = !this.isModalVisible;
        },

        // Funzione per inviare il form
        submitForm() {
            if (this.isValidForm()) {
                // Se il form è valido, invia il messaggio (simulato qui)
                this.isMessageSent = true;
                this.showMessageClass = 'message-shown';  // Aggiungi classe per l'animazione

                // Pulisci il form
                this.form.firstName = '';
                this.form.lastName = '';
                this.form.email = '';
                this.form.message = '';

                // Nascondi il messaggio dopo 3 secondi
                setTimeout(() => {
                    this.showMessageClass = 'message-hidden'; // Anima la scomparsa
                    setTimeout(() => {
                        this.isMessageSent = false;  // Nascondi definitivamente il messaggio
                        this.showMessageClass = '';  // Reset della classe
                    }, 500); // Tempo per completare l'animazione di scomparsa
                }, 3000); // Tempo per mantenere il messaggio visibile
            }
        },

        // Funzione per validare il form
        isValidForm() {
            // Verifica che i campi obbligatori siano compilati
            if (!this.form.email || !this.form.message) {
                alert("Email e messaggio sono obbligatori!");
                return false;
            }
            return true;
        }
    }
}
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-12 my-4">
                <div class="row">
                    <div class="col-sm-12 col-md-6 d-flex justify-content-center">
                        <img class="img-fluid m-2 rounded-4" :src="store.property.imageUrl" alt="Property image" v-if="!isLoading"/>
                    </div>
                    <div class="col-sm-12 col-md-6 justify-content-center">
                        <img class="img-fluid m-2 rounded-4" :src="store.property.imageUrl" alt="Property image" v-if="!isLoading"/>
                        <img class="img-fluid m-2 rounded-4" v-for="(image, index) in store.property.images" :key="index" :src="image.url" alt="Property image"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-8">
                    <div v-if="!isLoading">
                        <div class="col-8 text-center">
                            <h3>Description</h3>
                            <p>{{ store.property.description }}</p>
                            <h3>Price</h3>
                            <p>{{ store.property.price }} €</p>
                            <h3>Address</h3>
                            <p>{{ store.property.address }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                        <!-- Form di contatto -->
                    <h3 class="text-center">Contact Form</h3>
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label for="firstName" class="form-label">First Name</label>
                            <input type="text" class="form-control" v-model="form.firstName" id="firstName" placeholder="Enter your first name"/>
                        </div>
                        <div class="mb-3">
                            <label for="lastName" class="form-label">Last Name</label>
                            <input type="text" class="form-control" v-model="form.lastName" id="lastName" placeholder="Enter your last name"/>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" class="form-control" v-model="form.email" id="email" placeholder="Enter your email" required/>
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Message</label>
                            <textarea class="form-control" v-model="form.message" id="message" rows="3" placeholder="Enter your message" required></textarea>
                        </div>
                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-primary">Send</button>
                        </div>
                        </form>
                    </div>
                    <!-- Messaggio di successo -->
                    <div v-if="isMessageSent" :class="['success-message', showMessageClass]">
                        <div class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16" style="color: #4CAF50;">
                            <path d="M16 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM8 1a7 7 0 1 0 7 7A7 7 0 0 0 8 1zm3.854 5.146a.5.5 0 0 0-.708-.708L8.5 7.793 6.854 6.146a.5.5 0 1 0-.708.708L7.793 8l-1.647 1.646a.5.5 0 0 0 .708.708L8.5 8.707l1.646 1.646a.5.5 0 0 0 .708-.708L9.207 8l1.647-1.646z"/>
                        </svg>
                        <p class="ms-3 mb-0">Messaggio inviato con successo!</p>
                    </div>
                </div>
            </div>
            <div class="col-12">
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
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* Messaggio di successo */
    .success-message {
        background-color: #4CAF50; /* Verde per il successo */
        color: white;
        border-radius: 10px;
        padding: 15px;
        margin-top: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        animation: slideIn 1s ease-out forwards;
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
    p {
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
</style>
