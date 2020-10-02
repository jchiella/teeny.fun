<template>
  <div>
    <h1 class="text-center text-4xl font-bold mb-5">Hangman</h1>
    <HangmanGallows :state="gallowsState" />
    <h4>{{ gallowsState }}</h4>
    <button @click="nextState">Increment</button>
  </div>
</template>

<script>
import HangmanGallows from '@/components/HangmanGallows.vue';

import { ref } from 'vue';

export default {
  setup() {
    const gallowsState = ref(0);

    const nextState = () => {
      gallowsState.value += 1;
    };

    return {
      gallowsState,
      nextState,
    };
  },
  name: 'Hangman',
  components: {
    HangmanGallows,
  },
};
</script>
