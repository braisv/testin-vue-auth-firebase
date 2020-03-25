<template>
  <div>
    <h1>Sign Up</h1>
    <form
      @submit.prevent="
        createUser({ email: $v.email.$model, password: $v.password.$model })
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
      <input type="password" v-model="$v.password2.$model" class="form-control my-2" placeholder="Confirm password" />
            <small class="text-danger d-block" v-if="!$v.password2.sameAs"
        >Repeat password</small
      >
      <button
        type="submit"
        :disabled="$v.$invalid"
        class="btn btn-info mt-3"
      >
        Sign Up
      </button>
    </form>
    {{ error }}
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      password2: ""
    };
  },
  computed: {
    ...mapState(["error"]),
    lock() {
      return (
        this.$v.password.$model === this.$v.password.$model && this.$v.password.$model != ""
      );
    }
  },
  methods: {
    ...mapActions(["createUser"])
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    password2: { sameAs: sameAs('password') }
  }
};
</script>
