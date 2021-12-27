<template>
  <div class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center g-0 min-vh-100">
      <div class="col-lg-5 col-md-8 py-8 py-xl-0">
        <!-- Card -->
        <div class="card shadow ">
          <!-- Card body -->
          <div class="card-body p-6">
            <div class="mb-4">
              <h1 class="mb-1 fw-bold">Sign in</h1>
            </div>
            <!-- Form -->
            <form @submit.prevent="handleSubmit">
              <!-- Username -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" v-model="email" id="email" class="form-control" name="email" placeholder="Email address here" required>
              </div>
              <!-- Password -->
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" id="password" class="form-control" name="password" placeholder="**************" required>
              </div>
              <div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary ">Sign in</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default defineComponent({
  setup() {
    let email = ref('');
    let password = ref('');
    let store = useStore();
    let router = useRouter();

    const handleSubmit = async () => {
      try {
        let response = await fetch('https://todo-laravel-backend-api.herokuapp.com/api/login', {
          method: 'POST',
          headers: {"Content-type":"application/json"},
          body: JSON.stringify({email: email.value, password: password.value})
        })

        let json = await response.json();

        if (json.token) {
          store.commit('SET_TOKEN', json.token);
          store.commit('SET_USER', json.user);
          router.push('/tasks')
        } else {
          alert("Error occurred.")
        }

      } catch (e) {
        console.error("Error occurred: ", e.message)
      }
    }

    return {
      email,
      password,
      handleSubmit
    }
  }
})
</script>
