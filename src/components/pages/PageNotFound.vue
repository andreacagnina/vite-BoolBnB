<script>
export default {
    name: 'PageNoTFound',

}
</script>
<template>
    <section class="d-flex justify-content-center align-items-center h-100 ">
        <div class="text-center text-white">
            <h1>404 - Pagina Non Trovata</h1>
            <p>La pagina che stai cercando non esiste.</p>
            <router-link to="/">Torna alla Home</router-link>
        </div>
    </section>
</template>
<style lang="scss" scoped>
a {
    text-decoration: underline;
}

</style>