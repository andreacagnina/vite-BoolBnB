<script>

import footerMenu from '../../data/footerMenu.json';

export default {

    data() {
        return {
            footerMenu,
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

        <div class="container">
            <div class="footer-content" @click="toggleFooter">

                <h3 class="footer-toggle-text pb-4 pt-3">
                    <strong>
                        <i class="fa-solid fa-angles-down fa-lg" 
                        :class="isFooterOpen ? 'fa-flip-horizontal' : 'fa-flip-vertical'"></i>
                        <span class="ms-2">{{ isFooterOpen ? 'Hide' : 'Expand' }}</span>
                    </strong>
                </h3>
                
                <div class="social-icon d-flex align-items-center justify-content-evenly mb-0 pb-0">

                    <p>&copy; 2024 BoolBnB. All rights reserved.</p>

                    <ul class="d-flex">
                        <li>
                            <a href="">Terms</a>
                        </li>
                        <li>
                            <a href="">Sitemap</a>
                        </li>
                        <li>
                            <a href="">Privacy</a>
                        </li>
                    </ul>

                    <div class="d-flex align-items-end justify-content-end ms-5">
                        
                        <p><i class="fab fa-facebook-f"></i> <i class="fab fa-twitter"></i> <i class="fab fa-instagram"></i> <i class="fa-brands fa-linkedin"></i></p>

                    </div>

                </div>

            </div>

            <!-- Menu Aggiuntivo che si apre verso l'alto -->
            <transition name="expand">

                <div v-if="isFooterOpen" class="additional-footer-menu">

                    <div class="row">
                        <div class="col-12">  
                            <div class="d-flex justify-content-center">
                                <div v-for="section in footerMenu" :key="section.section" class="">
                                    
                                    <ul class="text-start">
                                        <li>
                                            <h4 class="fw-bold">{{ section.section }}</h4>
                                        </li>
                                        <li v-for="link in section.links" :key="link.url">
                                            <a :href="link.url">{{ link.name }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </transition>
        </div>
        
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
    @use "../../styles/partials/partials.scss" as *;
.app-footer {

    position: relative;
    z-index: 1;
    margin-top: auto;
    background-color: #49919d;
    padding-bottom: 20px;
    text-align: center;
    font-size: 1rem;
    color: #f7ede2;

}

/* Pulsante per aprire il Menu aggiuntivo */
.footer-toggle-text {
    font-size: 1rem;
    text-decoration: none;
    background: linear-gradient(45deg, #f6bd60, #ce6a6c);
    background-clip: text;
    color: transparent;

    &:hover {
        cursor: pointer;
        transform: scale(1.15);
        transition: all 0.3s ease-in-out;
    }
}

/* Menu aggiuntivo che si espande verso l'alto */
.additional-footer-menu {

    background: linear-gradient(360deg, #49919d, #84a59d);
    position: absolute;
    bottom: 99%;
    left: 0;
    width: 100%;
    z-index: 1;
    overflow-x: hidden;
    h4{
        color: #f6bd60;
    }

        ul {
            list-style: none;
            padding-top: 20px;
            color: black;

            li {
                padding: 5px 40px;

                a {
                    color: #f7ede2;
                text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
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

    ul  {
        li {
            padding-right: 25px;

            li-cust {
                text-decoration: none; }

            a {
                color: #f7ede2;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}

/* Contenuto del menu aggiuntivo */




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