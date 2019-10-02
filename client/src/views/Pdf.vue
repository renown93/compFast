<template lang='pug'>
.home
  .hero
    h1 PDF-IMAGE SIZE REDUCER
  FileUploader.file-uploader
  Operations.operations
</template>

<script>
import FileUploader from "@/components/FileUploader";
import Operations from "@/components/operations/Operations";
export default {
  name: "home",
  components: { FileUploader, Operations }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";
@import "@/scss/_mixins";

.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;

  .hero {
    text-align: center;
    margin: 5% 18%;
    font-size: 2.8rem;
    color: $main-text-color;
    font-family: $main-font;
    filter: drop-shadow(0 2px 2px rgb(128, 127, 127));
    @include for-phone-only {
      font-size: 1.5rem;
      margin: 5% 5%;
    }
  }
}
</style>
