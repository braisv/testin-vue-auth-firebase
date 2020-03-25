<template>
    <div>
        <h1>Log In</h1>
        <form @submit.prevent="login({ email, password })">
            <input type="email" v-model="$v.email.$model" class="form-control my-2">
            <input type="password" v-model="$v.password.$model" class="form-control my-2">
            <button type="submit" class="btn btn-info">Submit</button>
        </form>
        {{ error }}
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required, minLength, email } from "vuelidate/lib/validators";

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
    },
    validations: {
        email: { required, email },
        password: { required, minLength: minLength(6) }
    }
}
</script>