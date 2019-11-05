<template lang="pug">
    div
      .params-container(v-if='getParams[1]')
        button.button.card( 
        :class='{ button_selected : getParams[operation.pointer] === operation.name,faded:getParams[2] }' 
        v-for="(operation,i) in getChildOperations"
        :key='i' v-if="operation.type === 'button'"
        @click="mutateParam({ value: operation.name, index: operation.pointer })")
          p(:title="operation.title" ) {{operation.name}}
        input.input.card(
        :disabled="ifInputActive(operation.pointer)"  
        v-else-if="operation.type === 'input'" 
        :placeholder="operation.name" 
        :value='getParams[operation.pointer]'
        :name='operation.pointer' 
        @input='handleInput')
      .info
        p(v-if="checkParamType('compress')") *Please choose the strength of the operation to continue.<br/>*Select 'max' for smallest file size possible.
        p(v-else-if="checkParamType('changeDocType')") *Please choose the file type to change it to.
        p(v-else-if="checkParamType('resize') ") *Please fill in the size to continue. <br> *You can choose either percentage or width/height(pixel). 
        p(v-else-if="checkParamType('split')") *Please choose the page range to split.         
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Operations",
  computed: {
    ...mapGetters(["getChildOperations", "getParams"])
  },
  methods: {
    ...mapActions(["mutateParam", "mutateChildOperations"]),
    handleInput(e) {
      this.mutateParam({
        value: e.target.value,
        index: e.target.name
      });
    },
    checkParamType(param) {
      if (param === "compress" && this.getParams[1] === param) {
        return this.getParams[1] && !this.getParams[2];
      }
      if (param === "changeDocType" && this.getParams[1] === param) {
        return this.getParams[1] && !this.getParams[2];
      }
      if (param === "split" && this.getParams[1] === param) {
        return (this.getParams[1] && !this.getParams[2]) || !this.getParams[3];
      }
      if (param === "resize" && this.getParams[1] === param) {
        if (
          this.getParams[1] &&
          !this.getParams[2] &&
          !this.getParams[3] &&
          this.getParams[4]
        ) {
          return false;
        }
        if ((this.getParams[1] && !this.getParams[2]) || !this.getParams[3]) {
          return true;
        }
      }
    },
    ifInputActive(pointer) {
      if (
        (pointer === 4 && this.getParams[3] !== "") ||
        (pointer === 4 && this.getParams[2] !== "")
      ) {
        return true;
      }
      if (
        (pointer === 3 && this.getParams[4] !== "") ||
        (pointer === 2 && this.getParams[4] !== "")
      ) {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";
@import "@/scss/_mixins";
#main-container,
operation-container {
  font-family: $main-font;
  width: 100%;
  font-size: 1rem;
  @include for-tablet-landscape-up {
    font-size: 1.2rem;
  }
}

.params-container {
  // background-color: antiquewhite;
  margin: auto;
  display: flex;
  width: 65%;
  justify-content: center;
  align-items: center;

  @include for-tablet-landscape-up {
    width: 30%;
  }
  @include for-desktop-up {
    width: 20%;
  }
  .button {
    border-radius: 0.4rem;
    background-color: $main-color;
    padding: 0.5rem 0.7rem;
    margin: 0.7rem 1.2rem;
    color: white;
    &_selected {
      background-color: $main-color-selected;
    }
    @include for-tablet-portrait-up {
      font-size: 1rem;
      width: 6rem;
    }
  }
  .input {
    text-align: center;
    border-radius: 0.4rem;
    border: 0.2rem solid $main-color;
    width: 4rem;
    margin: 0.5rem 0.5rem;
    font-size: 0.7rem;
    flex-wrap: wrap;
    @include for-tablet-portrait-up {
      padding: 0.4rem;
      margin: 0.5rem 0.3rem;
      font-size: 0.8rem;
      width: 5rem;
    }
  }
}
.process-button {
  display: flex;
  font-size: 1.5rem;
  margin-top: 2rem;
  .button {
    border-radius: 0.4rem;
    background-color: $main-color;
    padding: 1.2rem 1rem;
    margin: auto;
    color: white;
    &_disabled {
      opacity: 0.4;
    }
  }
}
.info {
  text-align: center;
  color: $info-text-color;
  font-family: $main-font;
  font-size: 1rem;
  line-height: 1.5rem;
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
</style>