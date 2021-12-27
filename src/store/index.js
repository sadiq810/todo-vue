import { createStore } from 'vuex'
export default createStore({
  state: {
    token: undefined,
    user: undefined,
    completed: [],
    incompleted: [],
    locations: [],
    address: undefined,
    lat: undefined,
    lng: undefined
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;

      localStorage.setItem('token', token);
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },

    SET_TASKS(state, tasks) {
      state.completed = tasks.complete;
      state.incompleted = tasks.incomplete;
    },

    SET_LOCATIONS(state, data) {
      state.locations = data;
    },

    SET_ADDRESS(state, address) {
      state.address = address;
    },

    SET_LATLNG(state, latlng) {
      state.lat = latlng.lat;
      state.lng = latlng.lng;
    }
  },

  actions: {
    async fetchTasks({getters, commit}) {
      try {
        let response = await fetch('https://todo-laravel-backend-api.herokuapp.com/api/tasks', {
          method: 'GET',
          headers: {"Content-type":"application/json", "Authorization":"Bearer "+getters.getToken},
        })

        let json = await response.json();

        if (json.complete)
          commit('SET_TASKS', json);
        else
          console.error("Error occurred.")

      } catch (e) {
        console.error("Error occurred: ", e.message)
      }
    },

    async fetchLocations({getters, commit}) {
      try {
        let response = await fetch('https://todo-laravel-backend-api.herokuapp.com/api/locations', {
          method: 'GET',
          headers: {"Content-type":"application/json", "Authorization":"Bearer "+getters.getToken},
        })

        let json = await response.json();

        if (json.status)
          commit('SET_LOCATIONS', json.data);
        else alert("Error occurred.")

      } catch (e) {
        console.error("Error occurred: ", e.message)
      }
    },

    async saveLocation ({getters, dispatch}, locationDetails) {
      try {
        let response = await fetch('https://todo-laravel-backend-api.herokuapp.com/api/checkin', {
          method: 'POST',
          headers: {"Content-type":"application/json", "Authorization":"Bearer "+getters.getToken},
          body: JSON.stringify(locationDetails)
        })

        let json = await response.json();

        if (json.status)
          dispatch('fetchLocations');
        else alert("Error occurred.")

      } catch (e) {
        console.error("Error occurred: ", e.message)
      }
    },

    async fetchAddress({commit}, {lat, lng}) {
      try {
        let response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyBQhaezqwq3wXWnWl7nk2RD7QCIYpHCVZA");
        let res = await response.json();

        if (res.error_message) {
          console.log(res.error_message)
        } else {
          commit('SET_ADDRESS', res.results[0].formatted_address);
          commit('SET_LATLNG', {lat, lng});

        }
      } catch (error) {
        console.log(error.message);
      }
    },

    async deleteCheckin({dispatch, getters}, {id}) {
      try {
        let response = await fetch('https://todo-laravel-backend-api.herokuapp.com/api/checkin', {
          method: 'DELETE',
          headers: {"Content-type":"application/json", "Authorization":"Bearer "+getters.getToken},
          body: JSON.stringify({id})
        })

        let json = await response.json();

        if (json.status)
          dispatch('fetchLocations');
        else alert("Error occurred.")

      } catch (e) {
        console.error("Error occurred: ", e.message)
      }
    },

    async logout({commit}) {
      commit("SET_USER", undefined);
      commit("SET_TOKEN", undefined);

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    },

    getTasks(state) {
      return state.completed;
    },

    getIncompleteTasks(state) {
      return state.incompleted;
    },

    getLocations(state) {
      return state.locations;
    },

    getAddress(state) {
      return state.address;
    },

    getLatitude(state) {
      return state.lat;
    },

    getLongitude(state) {
      return state.lng;
    }
  }
})
