<template>
  <canvas ref="canvas" class="bg-white mx-auto" width="420" height="420"></canvas>
</template>

<script>
import { ref, onMounted, onUpdated } from 'vue';

export default {
  setup(props) {
    const canvas = ref(null);

    const cellSize = 20; // px

    const fillCell = (ctx, x, y) => {
      ctx.fillRect(x * cellSize + 2, y * cellSize + 2, cellSize - 4, cellSize - 4);
      ctx.stroke();
    };

    const redrawGrid = () => {
      const ctx = canvas.value.getContext('2d');
      const { width, height } = canvas.value;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'black';

      props.snakeCells.forEach(({ x, y }) => {
        fillCell(ctx, x, y);
      });
    };

    onMounted(redrawGrid);
    onUpdated(redrawGrid);

    return {
      canvas,
    };
  },
  name: 'SnakeGrid',
  props: {
    snakeCells: { type: Array },
  },
};
</script>
