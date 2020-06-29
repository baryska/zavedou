<template>
  <button class="button" @click="pressButton">
    {{ btnName }}
  </button>
  <!-- <img :src="image" @click="pressButton" /> -->
</template>
<script>
export default {
  name: "Button",
  props: ["btnName"],
  data() {
    return {
      image: "./assets/img/button_on.png",
    };
  },

  methods: {
    pressButton() {
      this.$emit("vyber");
    },
  },
};
</script>
<style scoped></style>
