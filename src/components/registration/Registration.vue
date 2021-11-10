<template>
  <div>
    <h1 class="centered">Cadastro</h1>
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
        <router-link to="/"><my-button caption="VOLTAR" type="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ImageResponsive from '../shared/image-responsive/ImageResponsive.vue'
import Button from '../shared/button/Button.vue';
import Photo from '../../domain/photo/Photo';

export default {

  components: {

    'image-responsive': ImageResponsive, 
    'my-button': Button
  },
  data() {
      return {

        photo: new Photo()

      }
  },
  methods: {
      save() {
          this.$http
            .post('http://localhost:3000/v1/fotos', this.photo)
            .then(() => this.photo = new Photo(), err => console.log(err));
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