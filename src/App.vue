<script>
import { store } from './store'; 
import Header from './components/layouts/Header.vue';
import Sidebar from './components/layouts/Sidebar.vue';
import Footer from './components/layouts/Footer.vue';


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