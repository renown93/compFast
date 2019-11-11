<template lang='pug'>
div
  .hero
    h1 Your File Is Ready!
  .button-container
    button.button( v-on:click='handleViewFile')
      Search  
      p View
    button.button( v-if=" getfileType === 'image' " v-on:click='download' )
      Download
      p Download
  .info
    p *Each uploaded file will be deleted  after one hour. Please, store the file locally.
  .back-buttons
    button.button(v-on:click='handleBack')
      BackArrow(:size="40")
    button.button( v-on:click='handleReset')
      Restart(:size="40" )
  .secondary-banner
    p ☕
    p I love coffee. <br> If this app was helpful for you. <br>You can buy me a cup of coffee :)
    p.name  M.Yagiz Yazicilar
  .paypal
    <img src="https://img.icons8.com/color/48/000000/paypal.png">
    a(href='https://paypal.me/yyazicilar') paypal.me/yyazicilar
  

</template>

<script>
import Search from "vue-material-design-icons/ImageSearch.vue";
import Download from "vue-material-design-icons/CloudDownload.vue";
import BackArrow from "vue-material-design-icons/ArrowLeft.vue";
import Restart from "vue-material-design-icons/Replay.vue";
import { forceFileDownload } from "@/utils/functions.js";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "Result",
  components: { Search, Download, BackArrow, Restart },
  computed: {
    ...mapGetters([
      "getChildOperations",
      "getParams",
      "getFileLink",
      "getfileType",
      "getFullFileName",
      "getFileDownloadLink"
    ])
  },
  methods: {
    ...mapActions(["deleteFile"]),
    handleViewFile() {
      window.open(this.getFileLink, "_blank");
    },
    download() {
      axios({
        method: "get",
        url: `https://${this.getFileDownloadLink}`,
        responseType: "arraybuffer"
      })
        .then(response => {
          forceFileDownload(response, this.getFullFileName);
        })
        .catch(() => console.log("error occured"));
    },
    handleBack() {
      this.$router.back();
    },
    handleReset() {
      this.deleteFile();
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";
@import "@/scss/_mixins";
.hero {
  text-align: center;
  margin: 2% 18%;
  margin-top: 5%;
  font-size: 2.8rem;
  color: $main-text-color;
  font-family: $main-font;
  filter: drop-shadow(0 2px 2px rgb(128, 127, 127));
  @include for-phone-only {
    font-size: 1.5rem;
    margin: 12% 5%;
  }
}
.info {
  text-align: center;
  color: $info-text-color;
  font-family: $main-font;
  font-size: 1rem;
  margin: 1rem;
  @include for-phone-only {
    font-size: 0.8rem;
  }
}
.secondary-banner {
  @include for-phone-only {
    p {
      font-size: 0.8rem;
    }
  }
  p:nth-child(1) {
    font-size: 2rem;
    margin-bottom: 0.8rem;
    @include for-phone-only {
      margin-top: 2rem;
    }
  }

  .name {
    text-align: center;
    margin-left: 12rem;
    margin-top: 0.2rem;
    color: $info-text-color;
    font-family: $main-font;
    font-size: 1rem;
    filter: none;
    @include for-phone-only {
      font-size: 0.6rem;
    }
  }
  text-align: center;
  margin-top: 3%;
  font-size: 1.2rem;
  line-height: 2rem;
  color: $main-text-color;
  font-family: $main-font;
  // filter: drop-shadow(0 3px 2px rgb(128, 127, 127));
  @include for-phone-only {
    font-size: 1.5rem;
    // margin: 5% 5%;
    line-height: 1.5rem;
  }
}
.button-container {
  margin: auto;
  display: flex;
  justify-content: center;
  width: 85%;
  @include for-phone-only {
    flex-wrap: wrap;
  }
  .button {
    background-color: $main-color;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 0.5rem;
    flex-basis: 10rem;
    padding: 0.5rem 0.5rem;
    margin: 1rem;
    @include for-tablet-portrait-up {
      min-height: 3rem;
      font-size: 1.4rem;
    }
    @include for-phone-only {
      flex-basis: 100%;
      margin: 0;
      margin-bottom: 2%;
    }
    &_disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &_selected {
      background-color: $main-color-selected;
    }
    p {
      margin-left: 0.2rem;
    }
  }
}
.back-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1%;

  .button {
    margin: 6rem;
    background-color: $main-color;
    display: flex;
    width: 4rem;
    height: 4rem;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 100%;
    // flex-basis: 5rem;
    padding: 0.5rem 0.5rem;
    margin: 1rem;
    @include for-tablet-portrait-up {
      min-height: 3rem;
      font-size: 1.4rem;
    }
    @include for-phone-only {
      // flex-basis: 100%;
      // margin: 0;
      // margin-bottom: 2%;
    }
    &_disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &_selected {
      background-color: $main-color-selected;
    }
    p {
      margin-left: 0.2rem;
    }
  }
}
.info {
  text-align: center;
  color: $info-text-color;
  font-family: $main-font;
  font-size: 1rem;
  margin: 1rem;
  @include for-phone-only {
    font-size: 0.8rem;
  }
}
.faded {
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
}
.paypal {
  font-family: $main-font;
  font-size: 0.8rem;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>