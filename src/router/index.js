import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Hangman from '../views/Hangman.vue';
import Snake from '../views/Snake.vue';
import Void from '../views/Void.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/hangman',
    name: 'Hangman',
    component: Hangman,
  },
  {
    path: '/snake',
    name: 'Snake',
    component: Snake,
  },
  {
    path: '/void',
    name: 'Void',
    component: Void,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
