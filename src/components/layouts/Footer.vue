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
                {{ isFooterOpen ? 'View less!' : 'View more!' }}
            </h3>

            <p>&copy; 2024 BoolBnB. All rights reserved.</p>

        </div>

        <!-- Menu Aggiuntivo che si apre verso l'alto -->
        <transition name="expand">

            <div v-if="isFooterOpen" class="additional-footer-menu">
                <div class="container">
                    <div class="row">
                    <div class="col-12 text-center my-3">  
                        <router-link class="footer-link" >Link placeholder 1</router-link>
                        <router-link class="footer-link" >Link placeholder 2</router-link>
                        <router-link class="footer-link" >Link placeholder 3</router-link>
                        <router-link class="footer-link" >Link placeholder 4</router-link>
                    </div>
                    <div class="col-12 text-center my-3 social-icon">
                        <p>Follow us on:</p>
                        <p><i class="fab fa-facebook-f"></i> <i class="fab fa-twitter"></i> <i class="fab fa-instagram"></i> <i class="fa-brands fa-linkedin"></i></p>
                        
                    </div>
                </div>
                </div>
            </div>

        </transition>
        
        <!-- Menu per mobile -->
        <div class="footer-menu">
            <ul>
                <li> <router-link class="footer-link" >Home</router-link></li>
                <li> <router-link class="footer-link" >Destinations</router-link></li>
                <li> <router-link class="footer-link" >Experiences</router-link></li>
                <li> <router-link class="footer-link" >About us</router-link></li>
                <li> <router-link class="footer-link" >Help</router-link></li>
            </ul>
        </div>

    </footer>
</template>

<style scoped lang="scss">
    .app-footer {
        background-color: transparent;
        padding: 20px;
        text-align: center;
        position: relative;
        z-index: 6;
    }

    .footer-content {
        margin-bottom: 10px;
        cursor: pointer;
        font-size: 1.2rem;
        color: #f7ede2;
    }

    /* Pulsante per aprire il Menu aggiuntivo */
    .footer-toggle-text {
        margin-top: 10px;
        font-size: 1rem;
        color: #f7ede2;
        text-decoration: none;
        cursor: pointer;
        &:hover {
            color: #f6bd60;
            transform: scale(1.2);
            transition: all 0.3s ease-in-out;
        }
    }

    /* Menu aggiuntivo che si espande verso l'alto */
    .additional-footer-menu {
        background: linear-gradient(
		45deg,
		#49919d,
		#84a59d
	);
        position: absolute;
        bottom: 100%;
        left: 0;
        width: 100%;
        height: 200px;
        padding: 10px 0;
        z-index: 5;
        display: flex;
        justify-content: center;
    }

    .social-icon{
        color: #f7ede2;
        cursor: pointer;   
        i{
            margin: 0 10px;
            font-size: 1.5rem;
            color: #f7ede2;
            cursor: pointer;
            &:hover{
                color: #f6bd60;
                transform: scale(1.2);
                transition: all 0.3s ease-in-out;
            }
        }
    }
    /* Contenuto del menu aggiuntivo */
    .additional-footer-menu ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
    }

    .additional-footer-menu li {
        margin: auto 20px;
        color: #f7ede2;
        cursor: pointer;
    }

    /* Animazione di espansione */
    .expand-enter-active, .expand-leave-active {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.5s ease, transform 0.5s ease;  
    }

    .expand-enter, .expand-leave-to {
        opacity: 0;
        transform: translateY(20px);/* Effetto di spostamento verso l'alto */
    }

    /* Menu mobile */
    .footer-menu {
        display: block;
        background: linear-gradient(
		45deg,
		#49919d,
		#84a59d
	);
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 10px 0;
    }

    .footer-menu ul {
        display: flex;
        list-style: none;
        margin: 0;
    }

    .footer-menu li {
        color: #f7ede2;
        cursor: pointer;
    }

    .footer-link {
        text-decoration: none;
        color: #f7ede2;
        margin: 20px 20px;
        &:hover {
            color: #f6bd60;
        }
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