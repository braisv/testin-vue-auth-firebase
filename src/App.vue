<template>
  <div id="app" class="container mt-5">
    <div id="nav">
      <router-link to="/" v-if="loggedUser" class="btn btn-primary m-2">Home</router-link>
      <router-link to="/signup" v-if="!loggedUser" class="btn btn-primary m-2">Sign up</router-link>
      <router-link to="/login" v-if="!loggedUser" class="btn btn-primary m-2">Log in</router-link>
      <a @click="logout" v-if="loggedUser" class="btn btn-danger m-2">Log Out</a>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['logout'])
  },
  computed: {
    ...mapGetters(['loggedUser'])
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
