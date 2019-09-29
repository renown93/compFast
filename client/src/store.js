import Vue from "vue"
import Vuex from "vuex"
import functions from "@/utils/functions.js"
import operations from "@/utils/operations.js"

Vue.use(Vuex)
const { checkDocType, generateFileName, reduceOperations, eraseDuplicates, pipe } = functions

export default new Vuex.Store({
  state: { fileName: "", formObject: null, err: [], params: [], operations },
  mutations: {
    FILE_NAME(state, value) {
      state.fileName = value
    },
    FORM_OBJECT(state, value) {
      state.formObject = value
    },
    ERROR(state, value) {
      state.err = value
    },
    MUTATE_PARAMS(state, { value, index }) {
      state.params[index] = value
    },
    DELETE_PARAMS(state) {
      state.params = []
    }
  },
  actions: {
    fileUpload({ commit }, { fileName, formObject }) {
      commit("FILE_NAME", fileName)
      commit("FORM_OBJECT", formObject)
    },
    pushError({ commit }, err) {
      commit("ERROR", err)
    },
    deleteFile({ commit }) {
      commit("FILE_NAME", "")
      commit("FORM_OBJECT", null)
      commit("DELETE_PARAMS")
      commit("ERROR", [])
    },
    mutateParam({ commit }, { value, index }) {
      commit("MUTATE_PARAMS", { value, index })
    }
  },
  getters: {
    fileName: ({ fileName }) => generateFileName(fileName, 15),
    fileType: ({ fileName }) => checkDocType(fileName),
    formObject: state => state.formObject,
    operations: ({ fileName, operations }) => operations[checkDocType(fileName)],
    // prettier-ignore
    initialOperations: ({ operations }) => pipe(reduceOperations, eraseDuplicates)(operations)
  }
})
