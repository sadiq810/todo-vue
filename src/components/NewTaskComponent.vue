<template>
  <div class="col-lg-9 col-md-8 col-12">
    <!-- Card -->
    <div class="card">
      <!-- Card header -->
      <div class="card-header">
        <h3 class="mb-0">Create new task</h3>
        <p class="mb-0">
          Enter detail of your task.
        </p>
      </div>
      <!-- Card body -->
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="row mb-5">
            <!-- Twitter -->
            <div class="col-lg-3 col-md-4 col-12">
              <h5>Title</h5>
            </div>
            <div class="col-lg-9 col-md-8 col-12">
              <input type="text" v-model="title" class="form-control mb-1" placeholder="Enter title..." required="required"/>
            </div>
          </div>
          <div class="row mb-5">
            <div class="col-lg-3 col-md-4 col-12">
              <h5>Task Detail</h5>
            </div>
            <div class="col-lg-9 col-md-8 col-12">
              <input type="text" v-model="detail" class="form-control mb-1" placeholder="Detail...." />
            </div>
          </div>

          <div class="row mb-5">
            <div class="col-lg-3 col-md-4 col-12">
              <h5>Due Date</h5>
            </div>
            <div class="col-lg-9 col-md-8 col-12">
              <Datepicker v-model="due_date" />
            </div>
          </div>

          <div class="row">
            <div class="offset-lg-3 col-lg-6 col-12">
              <button type="submit" class="btn btn-primary">Save</button>&nbsp;
              <button type="submit" class="btn btn-danger" @click="$emit('setTab', 'task')">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import {useStore} from "vuex";

export default defineComponent({
  name: "NewTaskComponent",
  components: {
    Datepicker,
  },
  emits: ['setTab'],

  setup(props, {emit}) {
    let due_date = ref(new Date());
    let title = ref('');
    let detail = ref('');
    let store = useStore();

    const handleSubmit = async() => {
      try {
        let response = await fetch('https://todo-laravel-backend-api.herokuapp.com/api/create-task', {
          method: 'POST',
          headers: {"Content-type":"application/json", "Authorization":"Bearer "+store.getters.getToken},
          body: JSON.stringify({title: title.value, detail: detail.value, due_date: due_date.value.getTime()/1000})
        })

        let json = await response.json();

        if (json.status) {
          await store.dispatch('fetchTasks');

          emit('setTab', 'task');
        } else {
          console.error("Error occurred: ")
        }
      } catch (e) {
        console.error("Error occurred: ", e.message)
      }
    }

    return {
      due_date,
      title,
      detail,
      handleSubmit
    }
  }
})
</script>
