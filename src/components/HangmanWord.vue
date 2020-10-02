<template>
  <h1 class="text-4xl text-center">{{ formattedWord }}</h1>
</template>

<script>
import { computed } from 'vue';

export default {
  setup(props) {
    const formattedWord = computed(() => props.word.split('').join(' ').toUpperCase());
    return {
      formattedWord,
    };
  },
  name: 'HangmanWord',
  props: {
    word: { type: String },
  },
};
</script>

<style>

</style>
