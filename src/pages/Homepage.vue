<script>
import AppFooter from '../layouts/AppFooter.vue';
export default {
    components: {
        AppFooter,
  }
}
</script>

<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="square"></div>
                </div>
                <div class="col-12">
                    <div class="square-b"></div>
                </div>
                <div class="col-12">
                    <div class="square"></div>
                </div>
                <div class="col-12">
                    <div class="square-b"></div>
                </div>
                <div class="col-12">
                    <div class="square"></div>
                </div>
                <div class="col-12">
                    <div class="square-b"></div>
                </div>
                <div class="col-12">
                    <div class="square"></div>
                </div>
                <div class="col-12">
                    <div class="square-b"></div>
                </div>
                <div class="col-12">
                    <div class="square"></div>
                </div>
                <div class="col-12">
                    <div class="square-b"></div>
                </div>
                <div class="col-12">
                    <div class="square"></div>
                </div>
                <div class="col-12">
                    <div class="square-b"></div>
                </div>

            </div>
            
            <AppFooter />
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
.container-fluid {
    height: calc(100vh - 200px);
    background-color: #000;
    overflow-y: scroll;
}   
.square {
    height: 100px;
    width: 100px;
    background-color: rgb(0, 255, 106);
}
.square-b {
    height: 100px;
    width: 100px;
    background-color: rgb(0, 17, 255);
}
</style>