<template>
<nav id="Navigation" class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/home">
    <h1>Theatre <span class="badge badge-success">Online</span></h1>
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link class="nav-link" to="/tv">Онлайн ТВ</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/movies">Фильмы</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/live">Live</router-link>
      </li>
    </ul>
    <ul class="navbar-nav my-2 mr-right my-lg-0">
      <li class="nav-item dropdown" v-if="!isLoggedIn">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Авторизация
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">

          <button class="dropdown-item" data-toggle="modal" data-target="#AuthModal">Войти</button>
          <button class="dropdown-item">Зарегистрироваться</button>
          <!--                    <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>-->
        </div>
      </li>
      <li class="nav-item dropdown" v-else>
        <a class="nav-link dropdown-toggle loginName" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{ login }}
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">

          <button class="dropdown-item" data-toggle="modal" data-target="#UserProfileModal">Профиль</button>
          <button class="dropdown-item" v-on:click="logout">Выйти</button>
          <!--                    <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>-->
        </div>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
import { bus } from 'router'
export default {
  data () {
    return {
      isLoggedIn: this.getAuth(),
      login: ''
    }
  },
  methods: {
    getAuth: function () {
      return !!((this.$cookies.get('rpc-api-session') !== '' && this.$cookies.get('isLoggedIn') === 'true'))
    },
    getCustomerInfo: function () {
      if (this.getAuth()) {
        this.$http({
          method: 'post',
          url: '/api/otv1/get-customer-info'
        })
          .then(response => {
            this.login = response.data.login
          })
      }
    },
    logout: async function () {
      this.$cookies.remove('rpc-api-session')
      this.$cookies.remove('isLoggedIn')
      this.isLoggedIn = await this.getAuth()
      this.$router.go()
    }
  },
  created () {
    this.isLoggedIn = this.getAuth()
    this.getCustomerInfo()
  },
  mounted () {
    bus.$on('loginevent', () => {
      this.isLoggedIn = this.getAuth()
    })
    this.getCustomerInfo()
  }
}
</script>
