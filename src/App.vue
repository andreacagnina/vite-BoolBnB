<script>
import Header from './layouts/Header.vue'
import Sidebar from './layouts/Sidebar.vue';
import Footer from './layouts/Footer.vue'

export default {
  components:{
    Header,
    Sidebar,
    Footer
  }
}
</script>

<template>
<div id="app">

  <!-- Header -->
  <Header />

  <!-- Sidebar -->
  <Sidebar />

  <!-- Main Content -->
  <div class="main-content">
    <router-view />
  </div>

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
