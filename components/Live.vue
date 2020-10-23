<template>
<div class="d-flex justify-content-center">
  <div id="tvChannelGrid" class="row h-100">
    <div class="col-sm-12 my-auto">
      <div class="tvComponent">
        <h1 class="display-3"><span class="badge badge-success">Live</span> Концерты и Спектакли</h1>
      </div>
      <LiveCategoryNav />
      <div id="AuthJumbo" class="jumbotron jumbotron-fluid" v-if="!this.$isLoggedIn">
        <div class="container">
          <h1 class="display-4">Выполните вход!</h1>
          <p class="lead">Для доступа ко всем возможностям портала!</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import LiveCategoryNav from './modules/LiveCategoryNav.vue'
export default {
  components: {
    LiveCategoryNav
  },
  data () {
    return {}
  }
}
</script>
