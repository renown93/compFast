<template>
  <div v-if="fileType.err" class="container">
    <button
      v-for="(operation,index) in initialOperations"
      :key="index"
      disabled
      class="button button_disabled card"
    >
      <p>{{operation.name}}</p>
    </button>
  </div>
  <div v-else class="container">
    <button v-for="(operation,index) in operations" :key="index" class="button card-2">
      <p>{{operation.name}}</p>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Operations",
  computed: {
    ...mapGetters([
      "fileName",
      "fileType",
      "initialOperations",
      "formObject",
      "operations"
    ])
  },
  methods: {
    ...mapActions(["fileUpload", "pushError", "deleteFile", "mutateParam"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";
@import "@/scss/_mixins";

.container {
  display: flex;
  margin: 3rem;
  justify-content: space-around;
  width: 40%;
  .button {
    background-color: $main-color;
    padding: 1rem 1.5rem;
    cursor: pointer;
    border-radius: 0.7rem;

    &_selected {
      background-color: $main-color-selected;
    }
    &_disabled {
      cursor: not-allowed;
      background-color: $main-color;
      opacity: 0.6;
    }
    p {
      font-size: 1.2rem;
      font-family: $main-font;
      font-weight: $font-weight-light;
      color: white;
    }
  }
}
</style>