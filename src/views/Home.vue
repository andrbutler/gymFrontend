<template>
  <div class="home">
   <section class="hero is-link is-fullheight-with-navbar has-background">
     <img class="hero-background" src="@/assets/images/landingPage.jpg"/>
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title is-1">
        Welcome to Iron City Fitness Center
      </h1>
</div>
  </div>
</section>
  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {
  }
}
</script>

<style lang="scss" scoped>
.hero.has-background {
  position: relative;
  overflow: hidden;
}
.hero-background {
  position: absolute;
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;
}
</style>
