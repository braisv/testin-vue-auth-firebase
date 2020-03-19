import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const firebase = require("firebase/app");
require("firebase/auth");

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "vue-auth-firebase-5a4eb.firebaseapp.com",
  databaseURL: "https://vue-auth-firebase-5a4eb.firebaseio.com",
  projectId: "vue-auth-firebase-5a4eb",
  storageBucket: "vue-auth-firebase-5a4eb.appspot.com",
  messagingSenderId: "965218580832",
  appId: process.env.APP_ID
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
