<script>
import HelloWorld from './pages/HelloWorld.vue'
import { router } from './router';
export default {
  components: {
    HelloWorld,
  }

}
</script>

<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
@use './styles/generals.scss';

main {
  height: 100vh;
}

section {
  height: 100%;
}
</style>
