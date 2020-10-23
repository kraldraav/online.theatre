import Vue from 'vue'
import App from '../App'
import VueRouter from 'vue-router'
import { VueAxios, axios } from 'vue-axios'
import VueCookies from 'vue-cookies'
import NProgress from 'nprogress'
import Home from '../components/Home.vue'
import Navigation from '../components/Navigation.vue'
import AuthLogin from '../components/Auth/Login.vue'
import TvChannels from '../components/tvChannels.vue'
import VOD from '../components/VOD.vue'
import Live from '../components/Live.vue'
import Player from '../components/Player.vue'

Vue.use(App)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

VueCookies.config('7d')

const token = VueCookies.get('rpc-api-session')
export const bus = new Vue()

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

const appRoutes = [{
  path: '/',
  component: Home,
  name: 'main'
},
{
  path: '/home',
  component: Home,
  name: 'home'
},
{
  path: '/tv',
  component: TvChannels,
  name: 'tv'
},
{
  path: '/movies',
  component: VOD,
  name: 'movies'
},
{
  path: '/play',
  component: Player,
  name: 'play',
  props: true
},
{
  path: '/live',
  component: Live,
  name: 'live'
}]

Vue.prototype.$isLoggedIn = (VueCookies.get('rpc-api-session')) ? VueCookies.get('rpc-api-session') : false

const router = new VueRouter({
  mode: 'history',
  routes: appRoutes
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default new Vue({
  el: '#app',
  data: {
  },
  router,
  template: <App/>,
  components: {
    home: Home,
    navigation: Navigation,
    authlogin: AuthLogin,
    tvchannels: TvChannels,
    App
  },
  methods: {}
})
