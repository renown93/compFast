<template>
  <div class="container">
    <!-- actual form that holds the data -->
    <form method="post" hidden="true" enctype="multipart/form-data">
      <input type="file" ref="actualForm" @change="handleFileUpload" />
    </form>

    <!-- Styled fake form that invokes actual form's functions. -->
    <div class="visibleForm card">
      <div class="file-name">
        <h5>{{getfileName}}</h5>
        <div v-if="ifFileUploaded" @click="handleFileDelete" class="clear-icon">
          <ClearIcon fillColor="#d2222d" />
        </div>
      </div>
      <button @click="handleClick" class="upload-button card">
        <UploadIcon fillColor="#FFFFFF" :size="30" />
      </button>
    </div>

    <!-- <div v-bind="fileType" v-if="errorCheck" class="warning">
      <p :key="err" v-for="err in fileType">*{{fileType.err}}</p>
    </div>-->
    <!-- / -->
  </div>
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
      console.log(this.$refs.actualForm.files[0]);
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
      this.$router.push("/");
      this.deleteFile();
    }
  },
  computed: {
    ...mapGetters(["getfileName"]),
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
  margin-top: 1rem;
}
// .container {
//   margin: 0 auto;
//   margin-top: 7rem;
//   width: 100%;
//   min-width: 30rem;
//   font-family: $secondary-font;
//   color: $info-text-color;
//   font-size: 1.5rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   @include for-phone-only {
//     margin-top: 3rem;
//     min-width: 20rem;
//     font-size: 0.7rem;
//   }
// }
// .visibleForm {
//   display: flex;
//   align-items: center;
//   justify-items: space-around;
//   padding: 0.21rem;
//   padding-left: 3rem;
//   height: 3.5rem;
//   border-radius: 2rem;
//   margin: 0 auto;
//   min-width: 35%;
//   @include for-phone-only {
//     height: 2.5rem;
//     min-width: 15rem;
//     // margin-left: 5px;
//   }
//   .file-name {
//     display: flex;
//     .clear-icon {
//       margin-left: 2px;
//     }
//   }
// }
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
// .warning {
//   margin-top: 1rem;
//   p {
//     color: $warning-text-color;
//   }
// }
</style>
