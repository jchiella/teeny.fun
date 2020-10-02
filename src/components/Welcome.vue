<template>
  <div>
    <h1 class="text-center text-blue-600 text-4xl font-bold">{{ msg }}</h1>
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

<style scoped>
</style>
