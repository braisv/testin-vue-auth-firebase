import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
const firebase = require("firebase/app");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    error: ""
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    createUser({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          commit("setUser", {
            email: res.user.email,
            password: res.user.password,
            uid: res.user.uid
          });
          router.push("/");
        })
        .catch(err => {
          commit("setError", err.message);
        });
    },
    login({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          commit("setUser", { email: res.user.email, id: res.user.uid });
          router.push("/");
        })
        .catch(err => {
          commit("setError", err.message)
        });
    }
  },
  modules: {}
});
