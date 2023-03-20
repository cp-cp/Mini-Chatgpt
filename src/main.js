import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import './mock';
import Vuex from 'vuex';
import store from './store/store';
import axios from 'axios';
import { Message } from 'element-ui';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Vuex);
new Vue({
  store,
  render: h => h(App),
  router: router
}).$mount('#app');
