<template>
  <div class="container">
    <!-- actual form that holds the data -->
    <form method="post" hidden="true" enctype="multipart/form-data">
      <input type="file" ref="actualForm" v-on:change="handleFileUpload()" />
    </form>

    <!-- Styled fake form that invokes actual form's functions. -->
    <div class="visibleForm card">
      <h5>{{fileName}}</h5>
      <button @click="handleClick" class="upload-button card">
        <UploadIcon fillColor="#FFFFFF" :size="30" />
      </button>
    </div>
    <!-- / -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import UploadIcon from "vue-material-design-icons/CloudUpload.vue";

export default {
  name: "FileUploader",
  components: { UploadIcon },
  methods: {
    ...mapActions(["fileUpload", "pushError"]),
    handleFileUpload() {
      this.fileUpload({
        fileName: this.$refs.actualForm.files[0].name,
        formObject: this.$refs.actualForm.files[0]
      });
      console.log(this.fileType);
      if (!this.fileType.err) {
        this.$router.push(this.fileType);
      } else {
        this.pushError(this.fileType.err);
      }

      //   let formData = new FormData();
      //   formData.append("newFile", this.form);
      //   axios
      //     .post("http://localhost:5000/image/compress/max", formData, {
      //       headers: { "Content-Type": "multipart/form-data" }
      //     })
      //     .then(console.log("success"))
      //     .catch(err => console.log(err));
    },
    handleClick() {
      this.$refs.actualForm.click();
    }
  },
  computed: {
    ...mapGetters(["fileName", "fileType"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";

.container {
  margin: 0 auto;
  margin-top: 8rem;
  width: 40%;
  min-width: 30rem;
  font-family: $secondary-font;
  color: $main-text-color-faded;
  font-size: 1.7rem;
}
.visibleForm {
  display: flex;
  align-items: center;
  padding: 0.21rem;
  padding-left: 3rem;
  height: 3.5rem;
  border-radius: 2rem;
}
.upload-button {
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.284);
  }
  margin-left: auto;
  margin-right: 0.5rem;
  width: 5rem;
  border: none;
  border-radius: 2rem;
  background-color: $main-color;
  cursor: pointer;
}
</style>