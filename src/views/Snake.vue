<template>
  <div>
    <h1 class="text-center text-4xl font-bold mb-5">Snake (WIP)</h1>
    <SnakeGrid :snakeCells="snakeCells"/>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

import SnakeGrid from '@/components/SnakeGrid.vue';

export default {
  setup() {
    const snakeCells = ref([{
      x: 10,
      y: 10,
    }]);

    const velocity = {
      x: 1,
      y: 0,
    };

    const headPos = {
      x: 10,
      y: 10,
    };

    const moveSnake = (event) => {
      event.preventDefault();
      const { key } = event;
      if (key === 'ArrowDown') {
        velocity.x = 0;
        velocity.y = 1;
      } else if (key === 'ArrowUp') {
        velocity.x = 0;
        velocity.y = -1;
      } else if (key === 'ArrowRight') {
        velocity.x = 1;
        velocity.y = 0;
      } else if (key === 'ArrowLeft') {
        velocity.x = -1;
        velocity.y = 0;
      }
    };

    const gameLoop = () => {
      headPos.x += velocity.x;
      if (headPos.x > 20) {
        headPos.x = 0;
      }
      if (headPos.y > 20) {
        headPos.y = 0;
      }
      if (headPos.x < 0) {
        headPos.x = 20;
      }
      if (headPos.y < 0) {
        headPos.y = 20;
      }
      headPos.y += velocity.y;

      // snakeCells.value.push({ ...headPos });
      snakeCells.value = [{ ...headPos }];
    };

    let intervalTimer;

    onMounted(() => {
      window.addEventListener('keydown', moveSnake);
      intervalTimer = setInterval(gameLoop, 250);
    });
    onUnmounted(() => {
      window.removeEventListener('keydown', moveSnake);
      clearInterval(intervalTimer);
    });

    return {
      snakeCells,
    };
  },
  name: 'Snake',
  components: {
    SnakeGrid,
  },
};
</script>
