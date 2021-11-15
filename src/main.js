import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directives/Transform';
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/test.css';
import './assets/js/test.js';
import 'bootstrap/dist/js/bootstrap.js';

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
Vue.http.options.root = process.env.API_URL ? process.env.API_URL: 'http://localhost:3000';

Vue.http.interceptors.push((req, next) => {

  // é possível colocar informações no header antes do envio da requisição
  //req.headers.set('Authorization', 'informação de segurança aqui');
  console.log('Lidando com o request');

  next(res => {
    console.log('Lidando com a resposta')
    // é possível acessar os dados da reposta e realizar transformações antes
    console.log(res.body);
  });

});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.http.options.root = 'http://localhost:3000';

new Vue({
  el: '#app',
  router,  
  render: h => h(App)
})
