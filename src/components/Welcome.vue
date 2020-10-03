<template>
  <div class="flex flex-col items-center">
    <h1 class="text-center text-4xl font-bold">{{ msg }}</h1>
    <img
      width="200"
      height="200"
      class="mt-5 rounded-full border-4 border-solid border-gray-500"
      src="../assets/cat.png"
    />
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
