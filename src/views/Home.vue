<template>
  <div>
    <h1>Task List</h1>
    <router-link :to="{ name: 'Add' }">
      <button class="btn btn-success btn-block mt-2 mb-2">Add</button>
    </router-link>
    <ul class="list-group">
      <li v-for="task of tasks" :key="task.id" class="list-group-item">
        {{ task.name }} - {{ task.id }}
        <div class="float-right">
          <router-link :to="{ name: 'Edit', params: { id: task.id } }">
            <button class="btn btn-warning btn-sm mr-2">Edit</button>
          </router-link>
          <button @click="deleteTask(task.id)" class="btn btn-danger btn-sm">
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  methods: {
    ...mapActions(["getTasks", "deleteTask"])
  },
  created() {
    this.getTasks();
  },
  computed: {
    ...mapState(["user", "tasks"])
  }
};
</script>
