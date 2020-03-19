import Vue from 'vue'
import Vuex from 'vuex'
const firebase = require("firebase/app");

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    error: ''
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setError(state, payload) {
      state.error = payload
    }
  },
  actions: {
    createUser({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then( res => {
        commit('setUser', { email: res.user.email, password: res.user.password, id: res.user.uid })
      })
      .catch( err => {
        console.log(err.message)
        commit('setError', err.message)
      })
    }
  },
  modules: {
  }
})
