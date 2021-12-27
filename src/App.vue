<template>
  <router-view/>
</template>
<script>
import {defineComponent, onBeforeMount} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      let token = localStorage.getItem('token');
      let user = localStorage.getItem('user');

      if (token)
        store.commit('SET_TOKEN', token);

      if (user) {
        store.commit('SET_USER', JSON.parse(user));
      }
    })
  }
})
</script>
