<template>
  <div>
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 243.3 65.3"
      style="enable-background:new 0 0 243.3 65.3;"
      xml:space="preserve"
      heigth="100%"
      width="100%"
    >
      <text transform="matrix(1 0 0 1 11.6896 46.8686)" class="st0 st1 st2">CompFast</text>
      <text transform="matrix(1 0 0 1 8.6896 46.8688)" class="st3 st1 st2">CompFast</text>
      <text transform="matrix(1 0 0 1 128.7917 60.25)" class="st4 st1 st5">compress,scale,split</text>
    </svg>
  </div>
</template>

<script>
export default {
  name: "logo"
};
</script>

<style lang="scss" scoped>
@import "@/scss/_mixins";
div {
  max-width: 200px;
  @include for-phone-only {
    max-width: 150px;
  }
}
.st0 {
  opacity: 0.31;
  fill: #333535;
}
.st1 {
  font-family: "Impact";
}
.st2 {
  font-size: 55.1971px;
}
.st3 {
  fill: #ffffff;
}
.st4 {
  fill: #f9f9fa;
}
.st5 {
  font-size: 12px;
}
</style>