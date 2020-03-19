<template>
    <div>
        <h1>Sign Up</h1>
        <form @submit.prevent="createUser({ email: email, password: password })">
            <input type="email" v-model="email">
            <input type="password" v-model="password">
            <input type="password" v-model="password2">
            <button type="submit">Sign Up</button>
        </form>
        {{error}}
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

console.log("API KEY: ", process.env.FIREBASE_KEY)
console.log("APP ID: ", process.env.FIREBASE_ID)

export default {
    name: 'Signup',
    data() {
        return {
            email: '',
            password: '',
            password2: ''
        }
    },
    computed: {
        ...mapState(['error'])
    },
    methods: {
        ...mapActions(['createUser'])
    }
}
</script>