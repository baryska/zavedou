<template>
  <div>
    <Map v-if="isSmapLoaded" />
  </div>
</template>

<script>
import Map from "./Map.vue";

export default {
  name: "Home",
  data() {
    return {
      isSmapLoaded: false,
    };
  },
  created() {
    const test = () => {
      if ("SMap" in window && "CONFIG" in SMap) {
        this.isSmapLoaded = true;
      } else {
        setTimeout(test, 50);
      }
    };
    test();
  },
  components: {
    Map,
  },
};
</script>
