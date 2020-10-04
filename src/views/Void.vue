<template>
  <div class="flex flex-col items-center">
    <h1 class="text-center text-4xl font-bold mb-5">The Void</h1>
    <h3 class="text-center text-gray-800 text-xl mb-5">
      Scream your grievances and watch them vanish into smoke...
    </h3>
    <input
      id="scream"
      ref="scream"
      type="text"
      class="outline-none bg-transparent text-4xl text-center w-11/12 mt-32"
      @keypress.enter="vanish"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const scream = ref(null);

    const vanish = () => {
      scream.value.classList.add('go');
      setTimeout(() => {
        scream.value.value = '';
        scream.value.classList.remove('go');
      }, 1400);
    };

    onMounted(() => scream.value.focus());

    return {
      scream,
      vanish,
    };
  },
  name: 'Void',
};
</script>

<style scoped>
  #scream {
    position: relative;
  }

  #scream.go {
    animation: floatUp 1.5s infinite normal ease-out;
  }

  @keyframes floatUp {
    0% {
      top: 0px;
      color: white;
    }
    100% {
      top: -400px;
      color: black;
    }
  }
</style>
