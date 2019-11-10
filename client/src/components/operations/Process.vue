<template lang="pug">
div
  .warning(v-if="getProcessError !== []")
    p(:key="i" v-for="(error,i) in getProcessError") *{{error}}
  .process-button
    button.button( :disabled='!isReadyToProcess' @click=' handleSubmit' :class='{ button_disabled : !isReadyToProcess }'  ) 
      p(v-if='!isBeingProcessed') Process
      .spinner(v-else)
        div
        div
        div
        div
        
         
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import { stringifyParams } from "@/utils/functions.js";
export default {
  name: "Process",
  computed: {
    ...mapGetters([
      "getOperations",
      "getInitialOperations",
      "getfileType",
      "getParams",
      "isReadyToProcess",
      "getFormObject",
      "isBeingProcessed",
      "getProcessError"
    ])
  },
  methods: {
    ...mapActions([
      "mutateParam",
      "mutateChildOperations",
      "process",
      "mutateFileLink",
      "pushProcessError"
    ]),
    handleSubmit: function() {
      if (this.isBeingProcessed) return;
      this.process();
      const formData = new FormData();
      const params = stringifyParams(this.getParams);

      formData.append("newFile", this.getFormObject);
      axios
        .post(params, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          this.process();
          this.mutateFileLink(`http://${res.data.link}`);
          this.$router.push(`/result`);
        })
        .catch(error => {
          const { err } = error.response.data;
          this.process();
          this.pushProcessError(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";
@import "@/scss/_mixins";

.process-button {
  display: flex;
  font-size: 1.5rem;
  margin-top: 2rem;

  .button {
    @include for-phone-only {
      font-size: 1.2rem;
    }
    min-width: 9rem;
    border-radius: 0.4rem;
    background-color: $main-color;
    padding: 1rem 1rem;
    margin: auto;
    color: white;
    &_disabled {
      opacity: 0.4;
      cursor: not-allowed;
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
.spinner {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 15px;
}
.spinner div {
  position: absolute;
  top: 10;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.spinner div:nth-child(1) {
  left: 6px;
  animation: spinner1 0.6s infinite;
}
.spinner div:nth-child(2) {
  left: 6px;
  animation: spinner2 0.6s infinite;
}
.spinner div:nth-child(3) {
  left: 26px;
  animation: spinner2 0.6s infinite;
}
.spinner div:nth-child(4) {
  left: 45px;
  animation: spinner3 0.6s infinite;
}
@keyframes spinner1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes spinner3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes spinner2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>