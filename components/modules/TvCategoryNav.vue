<template>
<ul class="nav" id="CategoryNav">
  <li class="nav-item" v-for="(item, index) in groups" :key="index">
    <a class="nav-link active" href="#">{{ item.name }}</a>
  </li>
</ul>
</template>

<script>
export default {
  data () {
    return {
      groups: []
    }
  },
  methods: {
    getAuth: function () {
      return !!((this.$cookies.get('rpc-api-session') !== '' && this.$cookies.get('isLoggedIn') === 'true'))
    },
    loadGroups: function () {
      this.$http({
        method: 'post',
        url: '/api/otv1/get-tv-groups',
        data: {
          'login': this.login,
          'password': this.password
        }
      })
        .then((response) => {
          this.groups = response.data['children']
        })
        .catch((response) => {
          // handle error
          console.log(response)
        })
    }
  },
  created () {
    this.loadGroups()
  }
}
</script>
