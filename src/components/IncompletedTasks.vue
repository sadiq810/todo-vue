<template>
  <div class="card-header border-bottom-0">
    <h3 class="mb-0">In-completed Tasks</h3>
  </div>
  <div class="table-invoice table-responsive border-0">
    <table class="table mb-0 text-nowrap">
      <thead class="table-light">
      <tr>
        <th scope="col" class="border-bottom-0">Task</th>
        <th scope="col" class="border-bottom-0">Due Date</th>
        <th scope="col" class="border-bottom-0">Status</th>
        <th scope="col" class="border-bottom-0">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="task in tasks" :key="task.id">
        <td>{{ task.title }}</td>
        <td>{{ task.due_date }}</td>
        <td>
          <span v-if="task.status === 0" class="badge bg-danger">Due</span>
          <span v-else class="badge bg-success">Incomplete</span>
        </td>
        <td>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="agreeCheck" @click="() => completeIt(task.id)">
            <label class="form-check-label" for="agreeCheck"></label>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {computed, defineComponent} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  name: "IncompletedTasks",
  setup() {
    const store = useStore();

    let tasks = computed(() => store.getters.getIncompleteTasks);

    const completeIt = async (id) => {
      try {
        let response = await fetch('https://todo-laravel-backend-api.herokuapp.com/api/task-completed', {
          method: 'POST',
          headers: {"Content-type":"application/json", "Authorization":"Bearer "+store.getters.getToken},
          body: JSON.stringify({id})
        })

        let json = await response.json();

        if (json.status) {
          await store.dispatch('fetchTasks');
        } else
          alert("Error occurred.")

      } catch (e) {
        console.error("Error occurred: ", e.message)
      }
    }

    return {
      tasks,
      completeIt
    }
  }
})
</script>
