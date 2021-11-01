<template>
  <div class="body">
    <h1 class="centered">{{ title }}</h1>
    <ul class="list-photos">
      <li class="list-photos-item" v-for="photo of photos">
        <my-panel :title="photo.titulo">
            <img class="img-responsive" :src="photo.url" :alt="photo.titulo">
        </my-panel>        
      </li>
    </ul>
  </div>
</template>

<script>
import Panel from './components/shared/panel/Panel.vue';

export default {
  components: {
    'my-panel' : Panel
  },
  data () {
    return {
      title: 'Alurapic',
      photos: []      
    }
  },
  created() {
    this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(photos => this.photos = photos, err => console.log(err));
  }
}
</script>

<style>
  .body{
    font-family: "Helvetica",sans-serif;
    width: 96%;
    margin: 0 auto;
  }

  .centered{
    text-align: center;
  }

  .list-photos{
    list-style: none;
  }

  .list-photos .list-photos-item{
    display: inline-block;
  }

  .img-responsive{
    max-width: 100%;
    height: auto;
  }

</style>
