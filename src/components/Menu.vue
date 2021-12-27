<template>
  <div class="col-lg-3 col-md-4 col-12">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-md navbar-light shadow-sm mb-4 mb-lg-0 sidenav">
      <!-- menu -->
      <a class="d-xl-none d-lg-none d-md-none text-inherit fw-bold" href="#">Menu</a>
      <button class="navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary text-light" type="button"
              data-bs-toggle="collapse" data-bs-target="#sidenav" aria-controls="sidenav" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="fe fe-menu"></span>
      </button>
      <!-- Collapse navbar -->
      <div class="collapse navbar-collapse" id="sidenav">
        <div class="navbar-nav flex-column">
          <span class="navbar-header">Menu</span>
          <ul class="list-unstyled ms-n2 mb-4">
            <li class="nav-item">
              <RouterLink to="/tasks" class="nav-link">
                <i class="fe fe-calendar nav-icon"></i>My Tasks</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/checkins">
                <i class="fe fe-credit-card nav-icon"></i>Locations</RouterLink>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="logout"><i class="fe fe-power nav-icon"></i>Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "Menu",

  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = () => {
      store.dispatch('logout');
      router.push({name: 'Login'})
    }

    return {
      logout
    }
  }
})
</script>
