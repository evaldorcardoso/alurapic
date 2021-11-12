import Home from './components/home/Home.vue';
const Registration = () => System.import('./components/registration/Registration.vue');


export const routes = [
    { path: '', name: 'home', component: Home, title: "Home", menu: true },
    { path: '/cadastro', name: 'register', component: Registration, title: "Cadastro", menu: true },
    { path: '/cadastro/:id', name: 'edit', component: Registration, title: "Cadastro"},
    { path: '*', component: Home }
];