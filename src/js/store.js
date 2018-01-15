import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    form: [
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        value: '',
        placeholder: 'Name',
        constantPlaceholder: 'Name',
        isFocus: false,
        errorType: 0
      },
      {
        id: 'email',
        type: 'email',
        label: 'Mail Address',
        value: '',
        placeholder: 'Mail Address',
        constantPlaceholder: 'Mail Address',
        isFocus: false,
        errorType: 0
      }
    ],
    join: {
      id: 'join',
      value: '出席'
    },
    message: {
      id: 'message',
      value: "",
      label: 'Message',
      placeholder: 'Message',
      constantPlaceholder: 'Message',
      isFocus: false,
    },
    isSending: false,
    isSend: false,
  },
  mutations: {
    SET_FORM_VALUE (state, payload) {
      state.form[payload['index']].value = payload.value
    },
    SET_JOIN_VALUE (state, value) {
      state.join.value = value
    },
    SET_TEXTAREA_VALUE (state, value) {
      state.message.value = value
    },
    CLEAR_FORM_PLACEHOLDER (state, payload) {
      state.form[payload['index']].placeholder = ''
    },
    RESET_FORM_PLACEHOLDER (state, payload) {
      state.form[payload['index']].placeholder = state.form[payload['index']].constantPlaceholder
    },
    RESET_TEXTAREA_PLACEHOLDER (state) {
      state.message.placeholder = state.message.constantPlaceholder
    },
    CLEAR_TEXTAREA_PLACEHOLDER (state) {
      state.message.placeholder = ''
    },
    SET_FORM_FOCUS (state, payload) {
      state.form[payload['index']].isFocus = payload.value
    },
    SET_TEXTAREA_FOCUS (state, value) {
      state.message.isFocus = value
    },
    SET_ERROR_TYPE (state, payload) {
      state.form[payload['index']].errorType = payload.type
    },
    RESET_ERROR_TYPE (state) {
      state.form.forEach((item, index) => {
        state.form[index].errorType = 0
      })
    },
    UPDATE_IS_SENDING (state, value) {
      state.isSending = value
    },
    UPDATE_IS_SEND (state) {
      state.isSend = true
    }
  }
})

export default store