<template>
  <h1 class="text-gray-500 text-2xl text-center">{{ statusMessage }}</h1>
</template>

<script>
import { computed } from 'vue';

export default {
  setup(props) {
    const statusMessage = computed(() => {
      if (props.status === 'normal') {
        return 'Press any key to guess...';
      }
      if (props.status === 'won') {
        return 'Congrats! You won!';
      }
      if (props.status === 'lost') {
        return 'Oh no! You lost!';
      }
      return ''; // dummy route
    });

    return {
      statusMessage,
    };
  },
  name: 'HangmanStatus',
  props: {
    status: { type: String },
  },
};
</script>
