<script>
export default {
name: 'AppHeader',
}
</script>

<template>
    <header class="app-header">
        <div class="container-fluid">
            <div class="row">

                <div class="col-sm-hide col-md-4">
                    <div class="square"></div>
                </div>

                <div class="col-12 col-md-4">
                    <div class="square"></div>
                </div>

                <div class="col-sm-hide col-md-4">
                    <div class="square"></div>
                </div>
                
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>

    .square {
            height: 100px;
            width: 100%;
            background-color: rgb(255, 102, 0);
            border: 1px solid black;
        }

        
    /* Su dispositivi mobile (fino a 767px) */
    @media (max-width: 767px) {
        .col-sm-hide {
            display: none;
        }
    }
</style>