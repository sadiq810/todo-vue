<template>
  <div class="pt-5 pb-5">
    <div class="container">

      <div class="row mt-0 mt-md-4">
        <Menu />

        <NewTaskComponent v-if="tab === 'new'"  @setTab="setTab"/>

        <TaskListComponent v-if="tab === 'task'" @setTab="setTab"/>

      </div>
    </div>
  </div>
</template>
<script>
import Menu from "../components/Menu";
import NewTaskComponent from "../components/NewTaskComponent";
import {defineComponent, ref} from "vue";
import {useStore} from "vuex";
import TaskListComponent from "../components/TaskListComponent";

export default defineComponent({
  components: {TaskListComponent, NewTaskComponent, Menu},

  setup() {
    let tab = ref('task');
    const store = useStore();

    store.dispatch('fetchTasks');

    const setTab = (t) => tab.value = t;

    return {
      tab,
      setTab
    }
  }
})
</script>
