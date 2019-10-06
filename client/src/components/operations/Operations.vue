<template lang="pug">
  #main-container
    .operation-container
      .button-container(v-if=" getfileType === '' ")
        button.button.button_disabled.card(:disabled="true" 
        :key="index" v-for="(operation,index) in getInitialOperations")
          p {{operation.name}}
      .button-container(v-else )
        button.button.card(v-for="(operation,i) in getOperations"
        :class='{ button_selected : getParams[1] === operation.route,faded:getParams[1] }'
        @click="handleClick(operation.route,1)"
        :key="i" )
          p {{ operation.name}}
      .info
        p(v-if="getParams[0] && !getParams[1]") * Please choose the operation to continue. 

      ChildOperations
      
      Process

         
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ChildOperations from "./ChildOperations";
import Process from "./Process";
export default {
  name: "Operations",
  components: { ChildOperations, Process },
  computed: {
    ...mapGetters([
      "getOperations",
      "getInitialOperations",
      "getfileType",
      "getParams",
      "isReadyToProcess"
    ])
  },
  methods: {
    ...mapActions(["mutateParam", "mutateChildOperations"]),

    handleClick(name, pointer) {
      this.mutateParam({ value: name, index: pointer });
      this.mutateParam({ value: "", index: 2 });
      this.mutateParam({ value: "", index: 3 });
      this.mutateParam({ value: "", index: 4 });
      this.mutateChildOperations();
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
      cursor: not-allowed;
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
</style>