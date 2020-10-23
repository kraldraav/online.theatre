<template>
<div class="d-flex justify-content-center">
  <div id="tvChannelGrid" class="row h-100">
    <div class="col-sm-12 my-auto">
      <div class="tvComponent" v-if="this.$isLoggedIn">
        <h1 class="display-3">{{ tvName }}</h1>
        <div id="player">

          <!-- <video-player :options="videoOptions" /> -->
          <v-clappr el="mycustomid" :source="source" />

        </div>
      </div>
      <div class="tvComponent" v-else>
        <div id="AuthJumbo" class="jumbotron jumbotron-fluid" v-if="!this.$isLoggedIn">
          <div class="container">
            <h1 class="display-4">Выполните вход!</h1>
            <p class="lead">Для доступа ко всем возможностям портала!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VClappr from 'v-clappr'
export default {
  components: {
    VClappr
  },
  props: ['channel'],
  data () {
    return {
      source: (this.channel) ? this.channel.url : this.$cookies.get('last-m3u'),
      tvName: (this.channel) ? this.channel.name : this.$cookies.get('last-tvcname')
    }
  },
  methods: {
    getAuth: function () {
      return !!((this.$cookies.get('rpc-api-session') !== '' && this.$cookies.get('isLoggedIn') === 'true'))
    }
  },
  create () {
    if (!this.getAuth()) {
      this.$router.push('/home')
    }
  },
  mounted () {
    if (this.channel) {
      this.$cookies.set('last-m3u', this.channel.url)
      this.$cookies.set('last-tvcname', this.channel.name)
      console.log(this.channel.name)
    }
  }
}
</script>
