<template>
  <div>
    <NavBar />
    <b-container class="pt-3">
      <nuxt />
    </b-container>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'

export default {
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
  $primary:#1E88E5;

  @import '../node_modules/bootstrap/scss/bootstrap';
  @import '../node_modules/bootstrap-vue/src/index.scss';
</style>
