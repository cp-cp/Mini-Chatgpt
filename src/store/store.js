import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      isAuthenticated: false,//记得修改回false
      username:"",
      userid:0,
    },
    mutations: {
      setIsAuthenticated(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated
      },
      setUserName(state, username) {
        state.username = username
      },
      setUserId(state, id) {
        state.userid = id
      },
    }
  })

export default store;