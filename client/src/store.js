import Vue from "vue"
import Vuex from "vuex"
import * as functions from "@/utils/functions.js"
import operations from "@/utils/operations.js"

Vue.use(Vuex)
const {
  generateFileName,
  generateOperations,
  findFileType,
  generateInitialOperations,
  isFileValid
} = functions

export default new Vuex.Store({
  state: {
    fileName: "",
    fileType: "",
    formObject: {},
    err: [],
    processError: [],
    params: [],
    operations,
    childOperations: [],
    isBeingProcessed: false,
    fileLink: ""
  },
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
    PROCESS_ERROR(state, value) {
      state.processError = value
    },
    MUTATE_PARAMS(state, { value, index }) {
      const newParams = [...state.params]
      newParams[index] = value
      state.params = newParams
    },
    DELETE_PARAMS(state) {
      state.params = []
    },
    FILE_TYPE(state, value) {
      state.fileType = value
    },
    CHILD_OPERATIONS(state, value) {
      state.childOperations = value
    },
    IS_BEING_PROCESSED(state) {
      state.isBeingProcessed = !state.isBeingProcessed
    },
    FILE_LINK(state, value) {
      state.fileLink = value
    }
  },
  actions: {
    fileUpload({ commit }, { fileName, formObject }) {
      commit("FILE_NAME", fileName)
      commit("DELETE_PARAMS")
      if (!isFileValid(fileName))
        return commit("ERROR", ["Unsupported Document Type."])
      commit("FORM_OBJECT", formObject)
      commit("FILE_TYPE", findFileType(fileName))
      commit("MUTATE_PARAMS", {
        value: findFileType(fileName),
        index: 0
      })
      commit("ERROR", [])
    },
    pushError({ commit }, err) {
      commit("ERROR", err)
    },
    pushProcessError({ commit }, err) {
      commit("PROCESS_ERROR", err)
    },
    deleteFile({ commit }) {
      commit("FILE_NAME", "")
      commit("FORM_OBJECT", {})
      commit("DELETE_PARAMS")
      commit("FILE_TYPE", "")
      commit("ERROR", [])
      commit("PROCESS_ERROR", [])
    },
    mutateParam({ commit }, { value, index }) {
      commit("MUTATE_PARAMS", { value, index })
    },
    mutateChildOperations({ getters, commit }) {
      const childOperations = getters.getOperations.filter(
        op => op.route === getters.getParams[1]
      )[0].params
      commit("CHILD_OPERATIONS", childOperations)
    },
    process({ commit }) {
      commit("IS_BEING_PROCESSED")
    },
    mutateFileLink({ commit }, link) {
      commit("FILE_LINK", link)
    }
  },
  getters: {
    getfileName: ({ fileName }) => generateFileName(fileName, 15),
    getFullFileName: ({ fileName, params }) =>
      params[1] === "changeDocType"
        ? fileName.substr(0, fileName.length - 3) + params[2]
        : fileName,
    getfileType: ({ fileType }) => fileType,
    getFormObject: state => state.formObject,
    getOperations: ({ fileType, operations }) =>
      generateOperations(fileType, operations),
    getChildOperations: ({ childOperations }) => childOperations,
    getParams: ({ params }) => params,
    getInitialOperations: ({ operations }) =>
      generateInitialOperations(operations),
    isReadyToProcess: ({ params }) =>
      (params[0] && (params[1] && params[2])) || params[4]
        ? true
        : false,
    isFileValid: ({ fileName }) => isFileValid(fileName),
    isBeingProcessed: ({ isBeingProcessed }) => isBeingProcessed,
    getFileLink: ({ fileLink }) => fileLink,
    getProcessError: ({ processError }) => processError,
    err: ({ err }) => err,
    getFileDownloadLink: ({ fileLink }) => fileLink.substr(5)
  }
})
