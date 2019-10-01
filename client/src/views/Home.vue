<template>
  <div class="home">
    <div class="hero">
      <h1>MAKE VARIOUS OPERATIONS ON PDF AND IMAGE FILES</h1>
    </div>
    <FileUploader class="file-uploader" />
    <Operations class="operations" />
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
// .home {
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   width: 100%;
//   height: 100%;
//   margin: auto;
//   .hero {
//     @include for-phone-only {
//       font-size: 1.5rem;
//     }
//     flex: 2;
//     justify-self: center;
//     flex-basis: 20rem;
//     width: 60%;
//     text-align: center;
//     color: $main-text-color;
//     font-family: $main-font;
//     margin-bottom: 0;
//     font-size: 2.8rem;
//     filter: drop-shadow(0 2px 2px rgb(128, 127, 127));
//   }
// }
</style>
