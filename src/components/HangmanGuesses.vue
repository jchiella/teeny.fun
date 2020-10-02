<template>
  <h1 class="text-red-500 text-4xl text-center">{{ formattedGuesses }}</h1>
</template>

<script>
import { computed } from 'vue';

export default {
  setup(props) {
    const formattedGuesses = computed(() => props.guesses.join(' ').toUpperCase());
    return {
      formattedGuesses,
    };
  },
  name: 'HangmanGuesses',
  props: {
    guesses: { type: Array },
  },
};
</script>

<style>

</style>
