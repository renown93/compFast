<template>
  <div class="home">
    <h1>MAKE PDF AND IMAGE FILES SMALLER</h1>
    <FileUploader />
    <Operations />
  </div>
</template>

<script>
import DownloadIcon from "vue-material-design-icons/CloudDownload.vue";
import FileUploader from "@/components/FileUploader";
import Operations from "@/components/Operations";
export default {
  name: "home",
  components: { DownloadIcon, FileUploader, Operations }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";
@import "@/scss/_mixins";

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
  h1 {
    @include for-phone-only {
      font-size: 1.5rem;
      margin: 5rem 1rem;
    }
    text-align: center;
    color: $main-text-color;
    font-family: $main-font;
    margin: 8rem 1rem;
    margin-bottom: 0;
    font-size: 2.8rem;
    filter: drop-shadow(0 2px 2px rgb(128, 127, 127));
  }
}
</style>
