<script>
import AppHeader from './layouts/AppHeader.vue';
import AppBottomHeader from './layouts/AppBottomHeader.vue';
import AppFooter from './layouts/AppFooter.vue';
import { router } from './router';
export default {
  components: {
    AppHeader,
    AppBottomHeader,
    AppFooter,
  }

}
</script>

<template>
  <main>
    <AppHeader />
    <router-view></router-view>

    <AppBottomHeader />
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
