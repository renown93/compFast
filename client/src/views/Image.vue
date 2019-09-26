<template>
  <div>{{params}}</div>
</template>

<script>
export default {
  name: "Image",
  computed: {
    params: function() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
</style>