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
<div id="wrapper">

  <!-- Header -->
  <Header />
  
  <!-- Sidebar -->
  <!--<Sidebar />-->
  <!-- Main Content -->
  <main  class="main-content">
    <router-view  />
  </main>
</div>

    <!-- Footer -->
    <Footer />

  </div>
</template>

<style lang="scss" scoped>
@use "./styles/partials/partials.scss" as *;

#wrapper {
  height: 100vh;
}


  main {
    overflow: auto;
    height: calc(100% - 87px);
  }

  footer {
min-height: 101px;    

  }

  header {
    height: 87px;
    background-color: $background-color;
  }
</style>