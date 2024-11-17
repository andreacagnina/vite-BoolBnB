<script>

export default {
    name: 'Loader',
}

</script>


<template>

<section>
    <div class="loader"></div>
</section>

</template>


<style lang="scss" scoped>

    @use '../../styles/partials/partials.scss' as *;

.loader {

    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid $acquagreen-color;
    border-right: 16px solid $darkgreen-color;
    border-bottom: 16px solid $darkpink-color;
    border-left: 16px solid $pink-color;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;

}

section {

    min-height: calc(100vh - 87px - 91px - 101px); /* 87px = altezza dell'header, 91px = altezza del filtro, 101px = altezza del footer */
    display: flex;
    justify-content: center;
    align-items: center;

}

@-webkit-keyframes spin {

    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }

}

@keyframes spin {

    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }

}

</style>