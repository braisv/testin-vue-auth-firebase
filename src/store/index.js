import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import db from "../main";
const firebase = require("firebase/app");


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    error: "",
    tasks: [],
    task: { name: '', id: '' },
    loading: false,
    search: ""
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    setTask(state, task) {
      state.task = task
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id != id)
    },
    loadFirebase(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    searchTasks({ state }, payload) {
      state.search = payload.toLowerCase();
    },
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
          
          db.collection(res.user.email).add({
            name: 'Example task'
          })
          .then( () => {
            router.push("/");
          })
        })
        .catch(err => {
          console.log(err)
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
          console.log(err.code)
          commit("setError", err.code)
        });
    },
    loggedInUser({ commit }, payload) {
      payload ? commit('setUser', { email: payload.email, uid: payload.uid }) : commit('setUser', null)
    },
    logout({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push("/login");
    },
    getTasks({ commit }) {
      commit('loadFirebase', true)
      const user = firebase.auth().currentUser
      const dbTasks = []
      db.collection(user.email).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let task = doc.data()
          task.id = doc.id
          dbTasks.push(task)
        })
        commit('loadFirebase', false)
      })
      commit('setTasks', dbTasks)
    },
    getTask({ commit }, id) {
      const user = firebase.auth().currentUser
      db.collection(user.email).doc(id).get()
      .then(doc => {
        let task = doc.data();
        task.id = doc.id;
        commit('setTask', task)
      })
    },
    editTask({ commit}, task) {
      const user = firebase.auth().currentUser
      db.collection(user.email).doc(task.id).update({
        name: task.name
      })
      .then( () => {
        router.push({ name: 'Home' })
      })
    },
    addTask({ commit }, taskName) {
      commit('loadFirebase', true)
      const user = firebase.auth().currentUser
      db.collection(user.email).add({
        name: taskName
      })
      .then( () => {
        router.push({ name: 'Home' })
        commit('loadFirebase', false)
      })
    },
    deleteTask({ commit }, id) {
      const user = firebase.auth().currentUser
      db.collection(user.email).doc(id).delete()
      .then( () => commit('deleteTask', id))
    }
  },
  getters: {
    loggedUser(state) {
      return state.user === null || state.user === '' || state.user === undefined ? false : true
    },
    filteredArray(state) {
      let filter = []
      for (let task of state.tasks) {
        let name = task.name.toLowerCase()
        if (name.indexOf(state.search) >= 0) filter.push(task)
      }
      return filter;
    }
  }
});
