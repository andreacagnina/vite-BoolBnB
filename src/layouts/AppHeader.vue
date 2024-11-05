<script>

export default {
    
}
</script>

<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="sm-none col-md-3 col-lg-4">
                            <div class="square"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="square"></div>
                        </div>
                        <div class="sm-none col-md-3 col-lg-4">
                            <div class="square"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .square {
        height: 100px;
        width: 100px;
        background-color: red;
    }

    // Extra small devices (portrait phones, less than 576px)
    @media (min-width: 0px) { 
        .sm-none {
            display: none;
        }
        .sm-block {
            display: block;
        }
    }

    // Small devices (landscape phones, 576px and up)
    @media (min-width: 576px) { 
        .sm-none {
            display: none;
        }

        .sm-block {
            display: block;
        }
    }

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) { 
        .sm-none {
            display: block;     
        }
        .sm-block {
            display: none;
        }
    }

    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) { 
        .sm-none {
            display: block;
        }

        .sm-block {
            display: none;
        }
    }
</style>