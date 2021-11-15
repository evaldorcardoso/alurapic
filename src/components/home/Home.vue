<template>
  <div>
    <h1 class="centered">{{ title }}</h1>
    <!-- <img src="/static/teste.png"> -->

    <p v-show="message" class="centered">{{ message }}</p>

    <input type="search" class="filter" @input="filter = $event.target.value" placeholder="filtre pelo título da foto">

    <ul class="list-photos">
      <li class="list-photos-item" v-for="photo of filteredPhotos" :key="photo._id">
        <my-panel :title="photo.titulo">
          <image-responsive v-meu-transform:scale.animate="2" :url=photo.url :title=photo.titulo />
          <router-link :to="{ name: 'edit', params: { id: photo._id } }">
            <my-button caption="Alterar" type="button"/>
          </router-link>
          <my-button 
            caption="Remover" 
            type="button" 
            :confirm="true"
            bstyle="danger"
            @activeButton="remove(photo)" />
        </my-panel>        
      </li>
    </ul>
  </div>
</template>

<script>
import Panel from '../shared/panel/Panel.vue';
import ImageResponsive from '../shared/image-responsive/ImageResponsive.vue';
import Button from '../shared/button/Button.vue';
import Transform from '../../directives/Transform';
import PhotoService from '../../domain/photo/PhotoService';

export default {
  components: {
    'my-panel': Panel,
    'image-responsive': ImageResponsive,
    'my-button': Button
  },
  directives: {
    'meu-transform': Transform
  },
  methods: {
    remove(photo) {      

      this.service
        .delete(photo._id)
        .then(
          () => {
            let index = this.photos.indexOf(photo);
            this.photos.splice(index, 1);
            this.message = 'Foto removida com sucesso!';    
          },
          err => { this.message = err.message; }
        );
    }
  },
  data () {
    return {
      title: 'Alurapic',
      photos: [],
      filter : '',
      message: '',    
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

    this.service = new PhotoService(this.$resource);

    this.service
      .list()
      .then(photos => this.photos = photos, err => { 
        console.log(err);
        this.message = err.message;
      });
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
