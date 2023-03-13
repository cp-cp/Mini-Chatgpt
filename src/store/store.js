import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      isAuthenticated: true,//记得修改回false
      username:"",
    },
    mutations: {
      setIsAuthenticated(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated
      },
      setUserName(state, username) {
        state.username = username
      }
    }
  })

export default store;