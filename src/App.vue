<script>
  import Header from './components/layouts/Header.vue'
  import Sidebar from './components/layouts/Sidebar.vue';
  import Footer from './components/layouts/Footer.vue';
  import Loader from './components/partials/Loader.vue';
  import { store } from './store';

  export default {
    components:{
      Header,
      Sidebar,
      Footer,
      Loader
    },
    data() {
      return {
        store,
        loading: true // Inizialmente il loader è visibile
      };
    },
    async mounted() {
      // Carica i dati nello store
      await this.loadData();
    },
    methods: {
      async loadData() {
        await this.store.fetchStoreData();
      }
    },
    watch: {
      // Osserva il cambiamento di `store.isLoaded`
      'store.isLoaded': function (newValue) {
        if (newValue) {
          this.loading = false; // Nasconde il loader quando i dati sono caricati
        }
      }
    }
  };
</script>

<template>
  <div id="app">
    <!-- Header -->
    <Header />

    <!-- Sidebar -->
    <!--<Sidebar />-->

    <!-- Main Content -->
    <main class="main-content">
      <Loader v-if="loading" /> <!-- Mostra il loader solo se loading è true -->
      <router-view v-else /> <!-- Mostra il contenuto solo dopo che loading è false -->
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style lang="scss">
#app 
  {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
    overflow: auto;
  }

  footer {
    margin-top: auto;
  }
</style>