import Home from './components/home/Home.vue';
import Registration from './components/registration/Registration.vue';

export const routes = [
    { path: '', name: 'home', component: Home, title: "Home", menu: true },
    { path: '/cadastro', name: 'register', component: Registration, title: "Cadastro", menu: true },
    { path: '*', component: Home }
];