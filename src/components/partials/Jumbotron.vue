<script>


export default {
    name: 'Jumbotron',

    
}
</script>

<template>
    <section class="text-light bgimg-1 mt-md-0 position-relative">
        <div class="w-100 h-100 bg-cust d-flex align-items-center text-center position-absolute top-0 left-0">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="boxcontent text-shadow">
                            <h1 class="display-1 d-block d-md-none mb-5">Start your holidays in the right place!</h1>
                            <h2 class="display-md-3 d-none d-md-block display-4 mb-5">Find a place that reflects you to spend quality time with the people you love.</h2>
                            <p class="lead display-6 d-none d-md-block"> Set out for your destination, knowing that home is there.</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
</section>


</template>

<style lang="scss" scoped>
@use "../../styles/partials/partials.scss" as *;
.bgimg-1 {
    background-position: center;
    background-size: cover;
    background-image: url("https://media.istockphoto.com/id/1402924724/photo/luxury-house-and-resort-on-the-beach-for-sea-views-and-living-3d-rendering.jpg?s=612x612&w=0&k=20&c=_LDpoofw5H9yfSsAGshW5eHBUmcaAtRGRI88l_mRtlY=");
min-height: 100vh;
  }

  .bg-cust{
    background-color: #19203394;
    padding: 20px;
  }

  .text-shadow{
    text-shadow: 2px 2px $background-color;
  }






</style>