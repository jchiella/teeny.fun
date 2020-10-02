<template>
  <div>
    <h1 class="text-center text-4xl font-bold">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  props: {
    msg: String,
  },
};
</script>
