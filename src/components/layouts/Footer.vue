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
            <div class="row">
                <div class="col-12">
                    <div class="footer-content" @click="toggleFooter">
                        <h3 class="footer-toggle-text py-3 m-0">
                            <strong>
                                <i class="fa-solid fa-angles-down fa-lg" 
                                :class="isFooterOpen ? 'fa-flip-horizontal' : 'fa-flip-vertical'"></i>
                                <span class="ms-2">{{ isFooterOpen ? 'Hide' : 'Expand' }}</span>
                            </strong>
                        </h3>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="text-center m-0 p-0">
                        <p class="mb-0">&copy; 2024 BoolBnB. All rights reserved.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <ul class="d-flex justify-content-center list-unstyled m-0 p-0">
                                <li>
                                    <a href="#">Terms</a>
                                </li>
                                <li>
                                    <a href="#">Sitemap</a>
                                </li>
                                <li>
                                    <a href="#">Privacy</a>
                                </li>
                            </ul>
                            </div>
                        </div>


            <div class="row">
                <div class="col-12">
                    <div class="d-flex align-items-end justify-content-center social-icon mt-3">
                        <a href="#"><i class="fab fa-facebook-f"></i></a> <a href="#"><i class="fab fa-twitter"></i></a> <a href="#"><i class="fab fa-instagram"></i></a> <a href="#"><i class="fa-brands fa-linkedin"></i></a> 
                    </div>
                </div>
            </div>


            <!-- Menu Aggiuntivo che si apre verso l'alto -->
            <transition name="expand">

                <div v-if="isFooterOpen" class="additional-footer-menu p-4">

                    <div class="row gy-2">
                                <div v-for="section in footerMenu" :key="section.section" class="col-6 col-md-3">

                                            <h4 class="fw-bold mt-2">{{ section.section }}</h4>
<ul>


    <li class="mb-1" v-for="link in section.links" :key="link.url">
        <a :href="link.url">{{ link.name }}</a>

</li>
</ul>

                                    </div>
                                </div>
                </div>
            </transition>
        </div>
    <!-- Menu per mobile -->
    <!-- <div class="footer-menu">
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
    </div> -->

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
    a {
        color: #f7ede2;
        text-decoration: none;
    }
    
}
ul {
    list-style: none;
    padding-top: 20px;
    color: black;
    padding-left: 0;

    li{
        padding: 5px 10px;

        a {
            color: #f7ede2;
        text-decoration: none;

            &:hover {
                color: #f6bd60;
            }
        }
    }
}

.social-icon{
    color: #f7ede2;
    cursor: pointer;   
a{
    margin: 0 10px;
    font-size: 1.5rem;
    color: #f7ede2;
    cursor: pointer;
    &:hover {
        color: #f6bd60;
        transform: scale(1.15);
        transition: all 0.3s ease-in-out;
    }

}

    ul  {
        li {
            padding-right: 25px;
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

</style>