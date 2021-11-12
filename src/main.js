import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directives/Transform';
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';

extend('required', {
  validate (value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true,
  message: 'Este campo é obrigatório!'
});

extend('minmax', {
  validate (value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message: 'O tamanho mínimo é {min}, o tamanho máximo é {max}'
});

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(VueResource);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.http.options.root = 'http://localhost:3000';

new Vue({
  el: '#app',
  router,  
  render: h => h(App)
})
