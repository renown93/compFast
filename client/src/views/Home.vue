<template>
  <div class="home">
    <h1>This is home page</h1>
    <h2>deneme</h2>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";
@import "@/scss/_mixins";
h2 {
  @include for-phone-only {
    color: red;
  }
  color: $main-color;
}
</style>
