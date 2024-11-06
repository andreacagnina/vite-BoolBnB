<script>
    export default {
        data() {
            return {
                isSidebarOpen: false, // Stato della sidebar
            };
        },
        methods: {
            toggleSidebar() {
                this.isSidebarOpen = !this.isSidebarOpen; // Alterna lo stato della sidebar
            },
        },
    };
</script>

<template>
    <div>
        <!-- Pulsante per attivare la sidebar -->
        <button class="sidebar-toggle" @click="toggleSidebar">
            {{ isSidebarOpen ? '>' : '<' }}
        </button>

        <!-- Sidebar a sinistra -->
        <transition name="expand">
            <div v-if="isSidebarOpen" class="sidebar">
                <ul>
                <li>Home</li>
                <li>Destinazioni</li>
                <li>Esperienze</li>
                <li>Host</li>
                <li>Aiuto</li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<style scoped lang="scss">
    /* Pulsante per attivare la sidebar */
    .sidebar-toggle {
        position: fixed;
        top: 110px;
        right: 0px;
        background-color: #ff5a5f;
        color: white;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        z-index: 10;
    }

    .sidebar {
        position: fixed;
        top: 100px; 
        right: 0;
        height: calc(100% - 60px);
        width: 250px;
        background-color: #333;
        color: white;
        padding: 20px;
        transition: width 0.5s ease;
        overflow-x: hidden;
        z-index: 4;
    }

    /* Menu all'interno della sidebar */
    .sidebar ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .sidebar li {
        padding: 15px 0;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .sidebar li:hover {
        
    }

    /* Animazioni per l'espansione della sidebar */
        .expand-enter-active, .expand-leave-active {
        transition: all 0.5s ease;
    }

    .expand-enter, .expand-leave-to {
        opacity: 0;
        transform: translateX(100%); 
    }

    /* MEDIA QUERIES */
    /* mobile */
    @media (max-width: 767px) {
        .sidebar {
            width: 100vw;
            text-align: center;
        }
    }
</style>