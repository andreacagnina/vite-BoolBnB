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
                <strong>{{ isFooterOpen ? 'View less!' : 'View more!' }}</strong>
            </h3>

            <p>&copy; 2024 BoolBnB. All rights reserved.</p>

        </div>

        <!-- Menu Aggiuntivo che si apre verso l'alto -->
        <transition name="expand">

            <div v-if="isFooterOpen" class="additional-footer-menu">
                <div class="container">
                    <div class="row">
                    <div class="col-12 text-center my-3">  
                        <router-link class="footer-link mx-2" >Link placeholder 1</router-link>
                        <router-link class="footer-link mx-2" >Link placeholder 2</router-link>
                        <router-link class="footer-link mx-2" >Link placeholder 3</router-link>
                        <router-link class="footer-link mx-2" >Link placeholder 4</router-link>
                    </div>
                    <div class="col-12 text-center my-3 social-icon">
                        <p class="follow-us"><strong>Follow us on:</strong></p>
                        <p><i class="fab fa-facebook-f"></i> <i class="fab fa-twitter"></i> <i class="fab fa-instagram"></i> <i class="fa-brands fa-linkedin"></i></p>
                        
                    </div>
                </div>
                </div>
            </div>

        </transition>
        
    <!-- Menu per mobile -->
    <div class="footer-menu">
        <ul>
            <li>
                <router-link to="/" class="footer-link" active-class="active">
                    <i class="fa-solid fa-house"></i>
                    <p>Explore</p>
                </router-link>
            </li>
            <li>
                <router-link to="/favorites" class="footer-link" active-class="active">
                    <i class="fa-regular fa-heart"></i>
                    <p>Favorites</p>
                </router-link>
            </li>
            <li>
                <router-link to="/profile" class="footer-link" active-class="active">
                    <i class="fa-regular fa-circle-user"></i>
                    <p>Profile</p>
                </router-link>
            </li>
        </ul>
    </div>

    </footer>
</template>

<style scoped lang="scss">
    .app-footer {
        background-color: #49919d;
        padding: 20px;
        text-align: center;
        position: relative;
        z-index: 0;
    }

    .footer-content {
        cursor: pointer;
        font-size: 1rem;
        color: #f7ede2;
        p{
            margin-bottom: 0;
        }
    }

    /* Pulsante per aprire il Menu aggiuntivo */
    .footer-toggle-text {
        margin-top: 10px;
        font-size: 1rem;
        color: #f7ede2;
        text-decoration: none;
        cursor: pointer;
        &:hover {
            background: linear-gradient(45deg, #f6bd60, #ce6a6c);
            background-clip: text;
            color: transparent;
            transform: scale(1.15);
            transition: all 0.3s ease-in-out;
        }
    }

    /* Menu aggiuntivo che si espande verso l'alto */
    .additional-footer-menu {
        background: linear-gradient(
            360deg,
            #49919d,
            #84a59d
        );
        position: absolute;
        bottom: 100%;
        left: 0;
        width: 100%;
        height: 150px;
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
                background: linear-gradient(45deg, #f6bd60, #ce6a6c);
                background-clip: text;
                color: transparent;
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
        padding: 5px 0;
        font-size: 2rem
    }

    .footer-menu ul {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .footer-menu li {
        text-align: center;
        color: #f7ede2;
        cursor: pointer;
    }

    .footer-link {
        text-align: center;
        text-decoration: none;
        color: #f7ede2;
        
        p {
            font-size: 1.2rem;
        }
        &:hover {
                   background: linear-gradient(45deg, #f6bd60, #ce6a6c);
                    background-clip: text;
                    color: transparent;
        }
        &.active {
                   background: linear-gradient(45deg, #f6bd60, #ce6a6c);
                    background-clip: text;
                    color: transparent;
        }
    }

    .follow-us:hover{
        background: linear-gradient(45deg, #f6bd60, #ce6a6c);
        background-clip: text;
        color: transparent;
        transform: scale(1.15);
        transition: all 0.3s ease-in-out;


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