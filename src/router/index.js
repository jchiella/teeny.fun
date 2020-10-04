import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Hangman from '../views/Hangman.vue';
import Snake from '../views/Snake.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
