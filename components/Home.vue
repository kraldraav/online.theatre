<template>
<div class="d-flex justify-content-center">
  <div id="tvChannelGrid" class="row h-100">
    <div class="col-sm-12 my-auto">
      <div class="tvComponent">
        <h1 class="display-3">Добро пожаловать!</h1>
      </div>
      <p class="lead">Популярные фильмы, лучшие сериалы
        <p>В каталоге представлено более 35 000 фильмов и сериалов в Full HD. Вы легко найдёте то, что вам нужно – в наших коллекциях или через поиск по жанру/актёру/режиссёру.</p>
        <div>
          <MainSlider />
        </div>
    </div>
  </div>
</div>
</template>

<script>
import MainSlider from './modules/MainSlider.vue'
export default {
  components: {
    MainSlider
  },
  data () {
    return {

    }
  }
}
</script>
