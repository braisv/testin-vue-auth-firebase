<template>
  <div>
    <h1>Task List</h1>
    <router-link :to="{ name: 'Add' }">
      <button class="btn btn-success btn-block mt-2 mb-2">Add</button>
    </router-link>

      <form>
        <input type="text" class="form-control mb-2" v-model="search" v-on:keyup="searchTasks(search)" placeholder="Search task...">
      </form>

    <ul class="list-group">
      <div v-if="loading" class="list-group-item text-center">
        <h3>Loading...</h3>
        <pacman-loader :loading="loading" class="mx-auto" style="width: 200px;"></pacman-loader>
      </div>

      <li v-for="task of filteredArray" :key="task.id" class="list-group-item">
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
import { mapActions, mapState, mapGetters } from "vuex";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";


export default {
  name: "Home",
  data() {
    return {
      search: ""
    }
  },
  methods: {
    ...mapActions(["getTasks", "deleteTask", "searchTasks"])
  },
  created() {
    this.getTasks();
  },
  computed: {
    ...mapState(["user", "tasks", "loading", "filteredTasks"]),
    ...mapGetters(["filteredArray"])
  },
  components: {
    PacmanLoader
  }
};
</script>
