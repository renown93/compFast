<template>
  <div class="imgs-container">
    <FileUploader />
    <Operations />
  </div>
</template>

<script>
import FileUploader from "@/components/FileUploader";
import Operations from "@/components/Operations";
export default {
  name: "Image",
  components: {
    FileUploader,
    Operations
  }
};
</script>

<style scoped>
.imgs-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>