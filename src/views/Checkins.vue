<template>
  <div class="pt-5 pb-5">
    <div class="container">

      <div class="row mt-0 mt-md-4">
        <Menu />

        <div class="col-lg-9 col-md-8 col-12">
          <!-- Card -->
          <div class="card">
            <!-- Card header -->
            <div class="card-header d-flex justify-content-between align-items-center">
              <div>
                <h3 class="mb-0">Current Location</h3>
                <div class="mb-0">
                <div class="d-flex">
                  <div>
                    <h5 class="mb-0">{{ address }}</h5>
                    <p class="mb-0 fs-6">{{ lat }}, {{ lng }}</p>
                  </div>
                </div>
                </div>
              </div>
              <div>
                <div class="form-check form-switch">
                  <button class="btn btn-outline-primary" title="Add location" @click="save">+</button>
                </div>
              </div>
            </div>

            <!-- Card body -->
            <div class="card-body">
              <div>
                <h4 class="mb-0">Previous Location</h4>
                <ul class="list-group list-group-flush">

                  <LocationItem v-for="location in locations" :key="location.id" :location="location" @remove="remove"/>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "../components/Menu";
import {computed, defineComponent,} from "vue";
import {useStore} from "vuex";
import LocationItem from "../components/LocationItem";

export default defineComponent({
  name: 'Checkins',
  components: {LocationItem, Menu},

  mounted() {
    this.$getLocation({enableHighAccuracy: true, timeout: 5000, maximumAge: 0})
        .then((coordinates) => {
          this.$store.dispatch("fetchAddress", {lat: coordinates.lat, lng: coordinates.lng})
        }).catch((error) => {
          console.log(error);
        });
  },

  setup() {
    const store = useStore();
    store.dispatch('fetchLocations');

    const locations = computed(() => store.getters.getLocations);

    const save = () => store.dispatch("saveLocation", {location: store.state.address, latitude: store.state.lat, longitude: store.state.lng});

    const remove = (id) => store.dispatch("deleteCheckin", {id})


    const address = computed(() => store.state.address);
    const lat = computed(() => store.state.lat);
    const lng = computed(() => store.state.lng);

    return {
      locations,
      save,
      address,
      lat,
      lng,
      remove
    }
  }
})
</script>
