<script>

import { store } from './store'; 
import Header from './components/layouts/Header.vue';
import Sidebar from './components/layouts/Sidebar.vue';
import Footer from './components/layouts/Footer.vue';
import Jumbotron from './components/partials/Jumbotron.vue';

export default {

  components:{

    Header,
    Sidebar,
    Footer,
    Jumbotron,

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
    <Jumbotron />
    
    <!-- Main Content -->
    <main >
      <router-view  />
    </main>
    
    <!-- Footer -->
    <Footer />
  </div>

</div>
</template>


<style lang="scss" scoped>
  @use "./styles/partials/partials.scss" as *;

  #wrapper {

    height: 100vh;
    display: flex;
    flex-direction: column;
  
  }

main {
  flex: 1;


}

</style>