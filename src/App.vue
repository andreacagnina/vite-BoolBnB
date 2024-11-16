<script>
  import Header from './components/layouts/Header.vue';
  import Sidebar from './components/layouts/Sidebar.vue';
  import Footer from './components/layouts/Footer.vue';

  import { store } from './store';

  export default {
    components:{
      Header,
      Sidebar,
      Footer,

    },
    data() {
      return {
        store
      }
    },
  }
</script>

<template>
  <div id="app">

    <!-- Header -->
    <Header />

    <!-- Sidebar -->
    <!--<Sidebar />-->
    <!-- Main Content -->
    <main  class="main-content">
      <router-view  />
    </main>

    <!-- Footer -->
    <Footer />

  </div>
</template>

<style lang="scss" scoped>
@use "./styles/partials/partials.scss" as *;

  main {
    overflow: auto;
    height: calc(100vh - 87px);
  }

  footer {
    

  }

  header {
    height: 87px;
    background-color: $background-color;
  }
</style>