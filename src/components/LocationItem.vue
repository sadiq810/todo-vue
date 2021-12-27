<template>
  <li class="list-group-item px-0 py-3">
    <div class="d-flex justify-content-between">
      <div class="d-flex">
        <img src="../assets/location.png" alt="" class="me-3">
        <div>
          <h5 class="mb-0">{{ location.location }}</h5>
          <p class="mb-0 fs-6">{{ location.latitude }}, {{ location.longitude }}</p>
        </div>
      </div>
      <button class="btn btn-outline-danger" @click="() => $emit('remove', location.id)">Delete</button>
    </div>
  </li>
</template>

<script>
export default {
  name: "LocationItem",
  props: {location: {type: Object, default: () => ({})}}
}
</script>
