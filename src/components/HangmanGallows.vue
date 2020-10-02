<template>
  <canvas ref="canvas" class="mx-auto bg-gray-900" width="200" height="200"></canvas>
</template>

<script>

import { ref, onMounted, onBeforeUpdate } from 'vue';

export default {
  setup(props) {
    const canvas = ref(null);

    const drawGallows = () => {
      const ctx = canvas.value.getContext('2d');
      ctx.beginPath();
      ctx.lineWidth = '4';
      ctx.strokeStyle = 'white';

      // gallows
      ctx.moveTo(10, 200 - 10);
      ctx.lineTo(10, 10);
      ctx.lineTo(100, 10);
      ctx.lineTo(100, 30);
      ctx.moveTo(120, 50);

      if (props.state >= 1) {
        // head
        ctx.arc(100, 50, 20, 0, Math.PI * 2);
      }

      if (props.state >= 2) {
        // body
        ctx.moveTo(100, 70);
        ctx.lineTo(100, 140);
      }

      if (props.state >= 3) {
        // left arm
        ctx.moveTo(100, 100);
        ctx.lineTo(60, 75);
      }

      if (props.state >= 4) {
        // right arm
        ctx.moveTo(100, 100);
        ctx.lineTo(200 - 60, 75);
      }

      if (props.state >= 5) {
        // left leg
        ctx.moveTo(100, 140);
        ctx.lineTo(60, 175);
      }

      if (props.state >= 6) {
        // right leg
        ctx.moveTo(100, 140);
        ctx.lineTo(200 - 60, 175);
      }

      ctx.stroke();
    };

    onMounted(drawGallows);
    onBeforeUpdate(drawGallows);

    return {
      canvas,
    };
  },
  name: 'HangmanGallows',
  props: {
    state: { type: Number },
  },
};
</script>
