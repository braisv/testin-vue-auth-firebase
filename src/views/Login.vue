<template>
    <div>
        <h1>Log In</h1>
        <form @submit.prevent="login({ email, password })">
            <input type="email" v-model="email">
            <input type="password" v-model="password">
            <button type="submit">Submit</button>
        </form>
        {{ error }}
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(['login'])
    },
    computed: {
        ...mapState(['error'])
    }
}
</script>