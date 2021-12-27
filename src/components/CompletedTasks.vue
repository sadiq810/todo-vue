<template>
  <div class="card-header border-bottom-0">
    <h3 class="mb-0">Completed Tasks</h3>
  </div>
  <div class="table-invoice table-responsive border-0">
    <table class="table mb-0 text-nowrap">
      <thead class="table-light">
      <tr>
        <th scope="col" class="border-bottom-0">Task</th>
        <th scope="col" class="border-bottom-0">Due Date</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.due_date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {computed, defineComponent} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  name: "CompletedTasks",
  setup() {
    const store = useStore();

    let tasks = computed(() => store.getters.getTasks);

    return {
      tasks
    }
  }
})
</script>
