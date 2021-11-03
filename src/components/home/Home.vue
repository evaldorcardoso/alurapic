<template>
  <div>
    <h1 class="centered">{{ title }}</h1>

    <input type="search" class="filter" @input="filter = $event.target.value" placeholder="filtre pelo título da foto">

    <ul class="list-photos">
      <li class="list-photos-item" v-for="photo of filteredPhotos">
        <my-panel :title="photo.titulo">
          <image-responsive :url=photo.url :title=photo.titulo></image-responsive>
        </my-panel>        
      </li>
    </ul>
  </div>
</template>

<script>
import Panel from '../shared/panel/Panel.vue';
import ImageResponsive from '../shared/image-responsive/ImageResponsive.vue';

export default {
  components: {
    'my-panel' : Panel,
    'image-responsive' : ImageResponsive
  },
  data () {
    return {
      title: 'Alurapic',
      photos: [],
      filter : ''    
    }
  },
  computed: {
    filteredPhotos() {
      if(this.filter){
        let exp = new RegExp(this.filter.trim(), 'i');
        return this.photos.filter(photo => exp.test(photo.titulo));
      }else{
        return this.photos;
      }
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
  .filter {
    display: block;
    width: 100%;
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
