<template>
    <div>
        <h1>Sign Up</h1>
        <form>
            <input type="email" v-model="email">
            <input type="password" v-model="password">
            <input type="password" v-model="password2">
            <button type="submit">Sign Up</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Signup',
    data() {
        return {
            email: '',
            password: '',
            password2: ''
        }
    }
}
</script>