<template>
  <div>
    <h1>Add</h1>
    <form @submit.prevent="addTask($v.name.$model)" class="form-inline">
      <label class="sr-only" for="inlineFormInputName2">Name</label>
      <input
        type="text"
        class="form-control mb-2 mr-sm-2"
        id="inlineFormInputName2"
        placeholder="Name of the task"
        v-model="$v.name.$model"
      />
      <button type="submit" class="btn btn-primary mb-2" :disabled="$v.$invalid || loading">Add</button>
    </form>
    <small class="text-danger" v-if="!$v.name.required">Required field</small>
    <small class="text-danger" v-if="!$v.name.minLength">Minimum 5 characters</small>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Add",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    ...mapActions(["addTask"])
  },
  validations: {
    name: { required, minLength: minLength(5) }
  },
  computed: {
    ...mapState(['loading'])
  }
};
</script>
