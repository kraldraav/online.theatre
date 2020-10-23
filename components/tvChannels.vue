<template>
<div id="pageContentContainer" class="d-flex justify-content-center">
  <div id="tvChannelGrid" class="row h-100">
    <div class="col-sm-12 my-auto">
      <div class="tvComponent">
        <h1 class="display-3">Онлайн ТВ</h1>

        <TvCategoryNav />

        <div id="AuthJumbo" class="jumbotron jumbotron-fluid" v-if="!this.$isLoggedIn">
          <div class="container">
            <h1 class="display-4">Выполните вход!</h1>
            <p class="lead">Для доступа ко всем возможностям портала!</p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3" v-for="channel in channels" :key="channel.media_content_code">
            <h3>{{ channel.name }}</h3>
            <div class="card mb-4 box-shadow">
              <img height='200px' class="card-img-top" :src="'http://192.168.85.3'+channel.logo_url" :data-src="'http://192.168.85.3'+channel.logo_url" alt="Card image cap">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <!--<button type="button" class="btn btn-sm btn-outline-secondary">View</button>-->
                    <button v-on:click="playTvChannel(channel)" type="button" class="btn rightButton btn-sm btn-primary">Смотреть</button>

                  </div>
                  <!-- <small class="text-muted">9 mins</small> -->
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import NProgress from 'nprogress'
import TvCategoryNav from './modules/TvCategoryNav.vue'
export default {
  components: {
    NProgress,
    TvCategoryNav
  },
  data () {
    return {
      channels: []
    }
  },
  methods: {
    getAuth: function () {
      return !(this.$cookies.get('rpc-api-session') !== '' && this.$cookies.get('isLoggedIn') === 'true')
    },
    playTvChannel: function (tvChannel) {
      this.$router.push({
        name: 'play',
        params: {
          channel: tvChannel
        }
      })
    },
    async loadChannels () {
      if (this.getAuth()) {
        await this.$http({
          method: 'post',
          url: '/api/otv1/get-tv-channels'
        })
          .then(response => {
            this.channels = response.data.channels
          })
      }
    }
  },
  beforeCreate () {
    NProgress.start()
  },
  mounted () {
    this.loadChannels()
    NProgress.done()
  },
  created () {

  }
}
</script>
