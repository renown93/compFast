import Vue from 'vue'
import Vuex from 'vuex'
import helper from '@/utils/helperFunctions.js'

Vue.use(Vuex)
const { checkDocType } = helper

export default new Vuex.Store({
  state: { fileName: '', formObject: null, err: [] },
  mutations: {
    FILE_NAME(state, value) {
      state.fileName = value
    },
    FORM_OBJECT(state, value) {
      state.formObject = value
    },
    ERROR(state, value) {
      state.err = value
    }
  },
  actions: {
    fileUpload({ commit }, { fileName, formObject }) {
      commit('FILE_NAME', fileName)
      commit('FORM_OBJECT', formObject)
    },
    pushError({ commit }, err) {
      commit('ERROR', err)
    }
  },
  getters: {
    fileName: ({ fileName }) => {
      if (fileName === '') {
        return 'Select a document to start'
      } else {
        return fileName
      }
    },
    fileType: ({ fileName }) => {
      return checkDocType(fileName)
    },
    formObject: state => state.formObject
  }
})
