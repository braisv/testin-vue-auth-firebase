<template>
  <div>
    <h1>Log In</h1>
    <form
      @submit.prevent="
        login({ email: $v.email.$model, password: $v.password.$model })
      "
    >
      <input
        type="email"
        v-model="$v.email.$model"
        class="form-control my-2"
        placeholder="E-mail"
      />
      <small class="text-danger d-block" v-if="!$v.email.required"
        >Required Field</small
      >
      <small class="text-danger d-block" v-if="!$v.email.email"
        >Invalid Email</small
      >
      <input
        type="password"
        v-model="$v.password.$model"
        class="form-control my-2"
        placeholder="Password"
      />
      <small class="text-danger d-block" v-if="!$v.password.required"
        >Required Field</small
      >
      <small class="text-danger d-block" v-if="!$v.password.minLength"
        >Minimum 6 characters</small
      >
      <button type="submit" class="btn btn-info mt-3" :disabled="$v.$invalid">
        Submit
      </button>
    </form>
    <p v-if="error === 'auth/user-not-found'">Incorrect user</p>
    <p v-if="error === 'auth/wrong-password'">Incorrect password</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"])
  },
  computed: {
    ...mapState(["error"])
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  }
};
</script>
