<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" v-if="loggedUser">Home</router-link> |
      <router-link to="/signup" v-if="!loggedUser">Sign up</router-link> |
      <router-link to="/login" v-if="!loggedUser">Log in</router-link> |
      <a @click="logout" v-if="loggedUser">Log Out</a>
      {{loggedUser}}
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
#app {
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
}
</style>
