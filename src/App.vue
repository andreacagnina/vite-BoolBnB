<script>
import Header from './components/layouts/Header.vue'
import Sidebar from './components/layouts/Sidebar.vue';
import Footer from './components/layouts/Footer.vue'
import { store } from './store';

export default {
  components:{
    Header,
    Sidebar,
    Footer
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
  <main class="main-content">
    <router-view />
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
