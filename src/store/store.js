import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      isAuthenticated: false
    },
    mutations: {
      setIsAuthenticated(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated
      }
    }
  })

export default store;