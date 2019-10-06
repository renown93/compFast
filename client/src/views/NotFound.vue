<template lang="pug">
.not-found
  h1 <span>404</span> Not Found.
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";
@import "@/scss/_mixins";
.not-found {
  font-size: 7rem;
  margin: 3rem;
  color: $main-text-color;
  font-family: $main-font;
}
</style>