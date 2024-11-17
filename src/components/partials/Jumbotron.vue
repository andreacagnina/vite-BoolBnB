<script>
export default {
    name: 'Jumbotron',
    
}
</script>

<template>
    <section class="text-light d-flex align-items-center bgimg-1" id="home">
        <div class="container">
          <div class="row">
            <div class="col-12">
                <div class="text-bg-dark opacity-75">
                    <h1 class="display-1 d-none d-md-block mb-5">Start your holidays in the right place!</h1>
                    <h2 class="display-3d-none d-md-block">Find a place that reflects you to spend quality time with the people you love.</h2>
                    <p class="lead">Stop wasting valuable time with projects that just isn't you. <br> Set out for your destination, knowing that home is there.</p>
                </div>
                    <p>
                        <a href="#property-card" class="btn btn-light btn-lg mt-3">Start Now</a>
                    </p>
            </div>
          </div>
        </div>
      </section>
</template>

<style lang="scss" scoped>
.bgimg-1 {
    background-position: center;
    background-size: cover;
    background-image: url("https://img.freepik.com/foto-gratuito/ragazza-felice-passa-il-tempo-a-casa-in-un-interno-accogliente_1321-1712.jpg?t=st=1731829396~exp=1731832996~hmac=2059347660d70f33bf7659f268540585a26c6ef45038193c7504fe0195d22dbb&w=1380");
    min-height: 100%;
  }

</style>