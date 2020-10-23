<template>
<div class="modal fade" id="AuthModal" tabindex="-1" role="dialog" aria-labelledby="Авторизация" aria-hidden="true" v-if="!this.$isLoggedIn">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Авторизация</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="alert alert-danger" role="alert" v-for="error of errors" v-bind:key="error">
        {{ error }}
      </div>
      <div class="modal-body">
        <form class="form-signin">
          <div class="form-label-group">
            <input v-model="login" type="email" id="inputLogin" class="form-control" placeholder="Логин, почта или телефон" required autofocus>
            <label for="inputLogin">Логин</label>
          </div>

          <div class="form-label-group">
            <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Пароль" required>
            <label for="inputPassword">Пароль</label>
          </div>

          <div class="custom-control custom-checkbox mb-3">
            <input type="checkbox" class="custom-control-input" id="customCheck1">
            <label class="custom-control-label" for="customCheck1">Забыли пароль?</label>
          </div>
          <button class="btn btn-lg btn-primary btn-block text-uppercase" type="button" v-on:click="auth">Войти</button>
          <!--<hr class="my-4">
                        <button class="btn btn-lg btn-google btn-block text-uppercase" type="button"><i class="fab fa-google mr-2"></i> Войти через Google</button>
                        <button class="btn btn-lg btn-facebook btn-block text-uppercase" type="button"><i class="fab fa-facebook-f mr-2"></i> Войти через Facebook</button>-->
        </form>
      </div>
      <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
                    <button type="button" class="btn btn-primary">Войти</button>
                </div> -->
    </div>
  </div>
</div>
</template>

<script>
import { bus } from 'router'
import { $ } from 'jquery'
export default {
  data () {
    return {
      login: '',
      password: '',
      errors: []
    }
  },
  methods: {
    validateForm: function (event) {
      if (this.login && this.password) {
        return true
      }

      this.errors = []

      if (!this.login) {
        this.errors.push('Требуется ввести логин!')
      }

      if (!this.password) {
        this.errors.push('Требуется ввести пароль!')
      }

      return false
    },
    auth: function () {
      if (!this.validateForm()) {
        return
      }
      this.errors = []
      this.$http({
        method: 'post',
        url: '/api/otv1/login',
        data: {
          'login': this.login,
          'password': this.password
        }
      })
        .then((response) => {
          // handle success
          this.errors = []
          this.$cookies.set('isLoggedIn', response.data.isLoggedIn)
          this.$cookies.set('rpc-api-session', response.data.session_id)
          bus.$emit('loginevent', [response.data.isLoggedIn])
          this.$isLoggedIn = !!((this.$cookies.get('rpc-api-session') !== '' && this.$cookies.get('isLoggedIn') === 'true'))
          this.$router.go()
          $('#AuthModal').modal('hide')
          $('.modal-backdrop').remove()
        })
        .catch((response) => {
          // handle error
          console.log(response)
          this.errors.push('Неправильный логин или пароль!')
        })
    }
  }
}
</script>
