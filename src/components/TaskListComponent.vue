<template>
  <div class="col-lg-9 col-md-8 col-12">
    <div class="card mb-4">
      <div class="d-lg-flex justify-content-between align-items-center card-header">
        <div class="mb-3 mb-lg-0">
          <h3 class="mb-0">Tasks List</h3>
        </div>
        <div>
          <a class="btn btn-outline-primary btn-sm" @click="() => $emit('setTab', 'new')">Create New</a>
        </div>
      </div>
    </div>

    <div class="card mb-4">
      <IncompletedTasks />
    </div>
    <div class="card mb-4">
      <CompletedTasks />
    </div>
  </div>

</template>

<script>
import CompletedTasks from "./CompletedTasks";
import IncompletedTasks from "./IncompletedTasks";

export default {
  name: "TaskListComponent",
  components: {IncompletedTasks, CompletedTasks}
}
</script>
