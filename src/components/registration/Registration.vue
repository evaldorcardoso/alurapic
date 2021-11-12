<template>
  <div>
    <h1 v-if="photo._id" class="centered">Alteração</h1>
    <h1 v-else class="centered">Inclusão</h1>
    <h2 class="centered">{{ photo.title }}</h2>

    <form @submit.prevent="save()">
      <div class="control">
        <label for="title">TÍTULO</label>
        <input v-model.lazy="photo.title" id="title" autocomplete="off">
      </div>

      <div class="control">
        <label for="url">URL</label>
        <input v-model.lazy="photo.url" id="url" autocomplete="off">
        <image-responsive :url="photo.url" :title="photo.title" v-show="photo.url"/>
      </div>

      <div class="control">
        <label for="description">DESCRIÇÃO</label>
        <textarea v-model="photo.description" id="description" autocomplete="off"></textarea>
      </div>

      <div class="centered">
        <my-button caption="GRAVAR" type="submit"/>
        <router-link :to="{ name: 'home' }"><my-button caption="VOLTAR" type="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ImageResponsive from '../shared/image-responsive/ImageResponsive.vue'
import Button from '../shared/button/Button.vue';
import Photo from '../../domain/photo/Photo';
import PhotoService from '../../domain/photo/PhotoService';

export default {

  components: {

    'image-responsive': ImageResponsive, 
    'my-button': Button
  },
  data() {
      return {

        photo: new Photo(),
        id: this.$route.params.id

      }
  },
  methods: {
      save() {

        this.service
          .register(this.photo)
          .then(() => {
            if(this.id) this.$router.push({ name: 'home' });            
            this.photo = new Photo()
          },
          err => console.log(err));          
      }
  },
  created() {
    this.service = new PhotoService(this.$resource);

    if(this.id) {
      this.service
        .get(this.id)
        .then(photo => { 
            this.photo._id = photo._id;
            this.photo.title = photo.titulo;
            this.photo.url = photo.url;
            this.photo.description = photo.descricao;
          });
    }
  }
}

</script>
<style scoped>

  .centered {
    text-align: center;
  }
  .control {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .control label {
    display: block;
    font-weight: bold;
  }

 .control label + input, .control textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centered {
    text-align: center;
  }

</style>