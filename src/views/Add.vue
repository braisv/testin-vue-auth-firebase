<template>
  <div>
    <h1>Add</h1>
    <form @submit.prevent="addTask(name)" class="form-inline">
      <label class="sr-only" for="inlineFormInputName2">Name</label>
      <input
        type="text"
        class="form-control mb-2 mr-sm-2"
        id="inlineFormInputName2"
        placeholder="Name of the task"
        v-model="name"
      />
      <button type="submit" class="btn btn-primary mb-2">Add</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Add",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    ...mapActions(["addTask"])
  }
};
</script>
