<template lang="pug">
.container
  //- Actual form that holds the data
  form(method="post" hidden="true" enctype="multipart/form-data")
    input( type="file" ref="actualForm" @change="handleFileUpload")
  //- Visual form that invokes actual form
  .visibleForm.card
    .file-name
      h5 {{getfileName}}
      .clear-icon
        ClearIcon(v-if="ifFileUploaded"
        @click="handleFileDelete"
        fillColor="#d2222d")
    button.upload-button.card(@click="handleClick")
      UploadIcon(fillColor="#FFFFFF"
      :size="30") 
  .info
    p(v-if="getfileName === 'Select a document to start'") * Please Upload The File To Continue.
  .warning(v-if="err !== []")
    p(:key="error" v-for="error in err") *{{error}}

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import UploadIcon from "vue-material-design-icons/CloudUpload.vue";
import ClearIcon from "vue-material-design-icons/Close.vue";

export default {
  name: "FileUploader",
  components: { UploadIcon, ClearIcon },
  methods: {
    ...mapActions(["fileUpload", "fileType", "deleteFile"]),
    handleFileUpload() {
      this.fileUpload({
        fileName: this.$refs.actualForm.files[0].name,
        formObject: this.$refs.actualForm.files[0]
      });
      // this.mutateParam({ value: this.fileType, index: 0 });
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
    },
    handleFileDelete() {
      // this.$router.push("/");
      this.deleteFile();
    }
  },
  computed: {
    ...mapGetters(["getfileName", "err"]),
    ifFileUploaded() {
      return this.getfileName !== "Select a document to start";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";
@import "@/scss/_mixins";
.container {
  @include for-phone-only {
    width: 90%;
  }
  @include for-tablet-portrait-up {
    width: 60%;
  }
  @include for-tablet-landscape-up {
    width: 50%;
  }
  @include for-desktop-up {
    width: 32%;
  }
}
.visibleForm {
  @include for-phone-only {
    font-size: 0.7rem;
  }
  @include for-tablet-portrait-up {
    font-size: 1rem;
  }
  @include for-tablet-landscape-up {
    font-size: 1.5rem;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0.3rem;
  padding-left: 2rem;
  border-radius: 3rem;
  font-family: $secondary-font;
  color: $info-text-color;
  .file-name {
    display: flex;
    align-items: center;
    width: 100%;
    @include for-phone-only {
      justify-content: center;
    }
  }
}
.warning {
  text-align: center;
  color: $warning-text-color;
  font-family: $main-font;
  margin: 1rem;
  @include for-phone-only {
    font-size: 0.8rem;
  }
}
.info {
  text-align: center;
  color: $info-text-color;
  font-family: $main-font;
  margin: 1rem;
  @include for-phone-only {
    font-size: 0.8rem;
  }
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
  @include for-phone-only {
    width: 4rem;
  }
}
</style>
