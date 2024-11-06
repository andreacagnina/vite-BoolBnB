<script>
export default {

    data() {
        return {
            isFooterOpen: false, // Stato per il menu aggiuntivo
        };
    },

    methods: {
        toggleFooter() {
            this.isFooterOpen = !this.isFooterOpen; // Alterna lo stato del footer
        },
    },
};
</script>

<template>
    <footer class="app-footer">

        <div class="footer-content" @click="toggleFooter">

            <h3 class="footer-toggle-text">
                {{ isFooterOpen ? 'Nascondi Menu Aggiuntivo' : 'Mostra Menu Aggiuntivo' }}
            </h3>

            <p>&copy; 2024 Airbnb Clone. All rights reserved.</p>

        </div>

        <!-- Menu Aggiuntivo che si apre verso l'alto -->
        <transition name="expand">

            <div v-if="isFooterOpen" class="additional-footer-menu">
                <ul>
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                    <li>Link 4</li>
                </ul>
            </div>

        </transition>
        
        <!-- Menu per mobile -->
        <div class="footer-menu">
            <ul>
                <li>Home</li>
                <li>Destinations</li>
                <li>Experiences</li>
                <li>Host</li>
                <li>Help</li>
            </ul>
        </div>

    </footer>
</template>

<style scoped lang="scss">
    .app-footer {
        background-color: #f7f7f7;
        padding: 20px;
        text-align: center;
        position: relative;
        z-index: 6;
    }

    .footer-content {
        margin-bottom: 50px;
        cursor: pointer;
        font-size: 1.2rem;
        color: #333;
    }

    /* Pulsante per aprire il Menu aggiuntivo */
    .footer-toggle-text {
        margin-top: 10px;
        font-size: 1rem;
        color: #ff5a5f;
        text-decoration: underline;
        cursor: pointer;
    }

    /* Menu aggiuntivo che si espande verso l'alto */
    .additional-footer-menu {
        background-color: #ff5a5f;
        position: absolute;
        bottom: 100%;
        left: 0;
        width: 100%;
        padding: 10px 0;
        z-index: 5;
        display: flex;
        justify-content: center;
    }

    /* Contenuto del menu aggiuntivo */
    .additional-footer-menu ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-around;
    }

    .additional-footer-menu li {
        color: white;
        cursor: pointer;
    }

    /* Animazione di espansione */
    .expand-enter-active, .expand-leave-active {
        transition: all 0.5s ease;
    }

    .expand-enter, .expand-leave-to {
        opacity: 0;
        transform: translateY(20px); /* Effetto di spostamento verso l'alto */
    }

    /* Menu mobile */
    .footer-menu {
        display: block;
        background-color: #ff5a5f;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 10px 0;
    }

    .footer-menu ul {
        display: flex;
        justify-content: space-around;
        list-style: none;
        margin: 0;
    }

    .footer-menu li {
        color: white;
        cursor: pointer;
    }

    /* MEDIA QUERIES */
    /* mobile */
    @media (max-width: 767px) {
        .footer-menu {
            display: block;
        }
    }

    /* table */
    @media (min-width: 768px) {
        .footer-menu {
            display: none; /* Nasconde il menu su tablet e desktop */
        }
    }
</style>