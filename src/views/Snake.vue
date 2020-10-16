<template>
  <div>
    <h1 class="text-center text-4xl font-bold mb-3">Snake (WIP)</h1>
    <h2 class="text-center text-3xl font-bold text-blue-500 mb-3">{{ snakeLength }}</h2>
    <SnakeGrid :snakeCells="snakeCells" :berryCells="berryCells" />
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

    const berryCells = ref([]);

    const velocity = {
      x: 1,
      y: 0,
    };

    const headPos = {
      x: 10,
      y: 10,
    };

    const maxBerries = 4;
    const berryInterval = 12; // * gameLoopInterval
    const gameLoopInterval = 250; // ms

    const snakeLength = ref(1);
    let loopsSinceBerry = 0;

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

    const addBerry = () => {
      if (berryCells.value.length <= maxBerries) {
        const newBerry = {
          x: Math.floor(Math.random() * 21),
          y: Math.floor(Math.random() * 21),
        };
        berryCells.value = [...berryCells.value, newBerry];
      }
    };

    const gameLoop = () => {
      loopsSinceBerry += 1;

      if (loopsSinceBerry > berryInterval) {
        loopsSinceBerry = 0;
        addBerry();
      }

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

      if (snakeCells.value.length >= snakeLength.value) {
        snakeCells.value = [...snakeCells.value.slice(1), { ...headPos }];
      } else {
        snakeCells.value = [...snakeCells.value, { ...headPos }];
      }

      const snakeHead = snakeCells.value[0];

      if (berryCells.value.length > 0) {
        const berryIndices = [];

        berryCells.value.forEach((berry, index) => {
          if (!berry) return;
          if (snakeHead.x === berry.x && snakeHead.y === berry.y) {
            snakeLength.value += 1;
            berryIndices.push(index);
          }
        });

        berryIndices.forEach((idx) => {
          berryCells.value.splice(idx, 1);
        });
      }
    };

    let intervalTimer;

    onMounted(() => {
      window.addEventListener('keydown', moveSnake);
      intervalTimer = setInterval(gameLoop, gameLoopInterval);
    });
    onUnmounted(() => {
      window.removeEventListener('keydown', moveSnake);
      clearInterval(intervalTimer);
    });

    return {
      snakeCells,
      berryCells,
      snakeLength,
    };
  },
  name: 'Snake',
  components: {
    SnakeGrid,
  },
};
</script>
