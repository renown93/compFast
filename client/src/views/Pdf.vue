<template>
  <div class="pdf-container">
    <FileUploader />
    <Operations />
  </div>
</template>

<script>
import FileUploader from "@/components/FileUploader";
import Operations from "@/components/Operations";
export default {
  name: "Pdf",
  components: {
    FileUploader,
    Operations
  }
};
</script>

<style scoped>
.pdf-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>