<template lang="pug">
  #main-container
    .operation-container

      .button-container(v-if="getfileType === ''")

        button.button.button_disabled.card(:disabled="true" 
        :key="index" v-for="(operation,index) in getInitialOperations")
          p {{operation.name}}

      .button-container(v-else)

        button.button.card(v-for="(operation,i) in getOperations"
        :class='{ button_selected : getParams[1] === operation.route }'
        @click="handleClick(operation.route,1)"
        :key="i" )
          p {{ operation.name}}
      .info
        p(v-if="getParams[0] && !getParams[1]") * Please choose the operation to continue. 

      .params-container(v-if='getParams[1]')
        button.button.card( 
          :class='{ button_selected : getParams[operation.pointer] === operation.name }' 
          v-for="(operation,i) in getChildOperations" :key='i' v-if="operation.type === 'button'"
          @click="mutateParam({ value: operation.name, index: operation.pointer })"
          )
          p {{operation.name}}
        input.input.card( 
        v-else-if="operation.type === 'input'" 
        :placeholder="operation.name" 
        :value='getParams[operation.pointer]'
        :name='operation.pointer' 
        @input='handleInput')
      .info
        p(v-if="checkIfType('resize') ") *Please fill in the size to continue. <br> *You can choose either percentage or width/height. 
        p(v-else-if="checkIfType('split')") *Please choose the page range to split. 
        p(v-else-if="checkIfType()") *Please choose the strength of the operation to continue.
       
      .process-button
        button.button(:class='{ button_disabled : !isReadyToProcess }' ) 
          p Process
         
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Operations",
  computed: {
    ...mapGetters([
      "getFormObject",
      "getOperations",
      "getChildOperations",
      "getInitialOperations",
      "getfileType",
      "getParams",
      "isReadyToProcess"
    ])
  },
  methods: {
    ...mapActions([
      "fileUpload",
      "pushError",
      "deleteFile",
      "mutateParam",
      "mutateChildOperations"
    ]),
    handleInput(e) {
      this.mutateParam({
        value: e.target.value,
        index: e.target.name
      });
    },
    checkIfType(param) {
      if (param === "split") {
        this.getParams[0] &&
          this.getParams[1] === param &&
          !this.getParams[2] &&
          !this.getParams[3];
      }
      if (param)
        return (
          this.getParams[0] && this.getParams[1] === param && !this.getParams[2]
        );
      return this.getParams[0] && this.getParams[1] && !this.getParams[2];
    },

    handleClick(name, pointer) {
      this.mutateParam({ value: name, index: pointer });
      this.mutateParam({ value: "", index: 2 });
      this.mutateParam({ value: "", index: 3 });
      this.mutateParam({ value: "", index: 4 });
      this.mutateChildOperations();
    }
  },
  components: {}
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
    color: white;
    border-radius: 0.5rem;
    flex-basis: 7rem;
    padding: 0.5rem 0.5rem;
    margin: 1rem;
    @include for-tablet-portrait-up {
      min-height: 3rem;
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
  margin: 1rem;
  @include for-phone-only {
    font-size: 0.8rem;
  }
}
// .params {
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-content: center;
//   flex-direction: row;

//   .button {
//     border-radius: 0.4rem;
//     background-color: $main-color;
//     padding: 0.5rem 0.7rem;
//     margin: 0.7rem 1.2rem;
//     color: white;
//     font-size: 1.2rem;
//     &_selected {
//       background-color: $main-color-selected;
//     }
//     @include for-phone-only {
//       padding: 0.5rem 0.7rem;
//       margin: 0.7rem 1.2rem;
//       color: white;
//       font-size: 0.7rem;
//     }
//     @include for-tablet-portrait-up {
//     }
//     @include for-tablet-landscape-up {
//     }
//     @include for-desktop-up {
//     }
//   }
//   .input {
//     text-align: center;
//     border-radius: 0.4rem;
//     border: 0.2rem solid $main-color;
//     width: 5rem;
//     padding: 0.5rem 0.7rem;
//     margin: 0.7rem 1.2rem;
//   }
// }
</style>