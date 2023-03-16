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

// // 添加拦截器
// axios.interceptors.response.use(response => {
//   return response;
// }, error => {
//   if (error.response && error.response.status === 503) {
//     alert('连接数过多，请稍后再试');
//   } else {
//     return Promise.reject(error);
//   }
// });

// // 创建 Axios 实例
// const service = axios.create({
//   baseURL: process.env.VUE_APP_API_BASE_URL, // API 接口的基础 URL
//   timeout: 10000, // 请求超时时间
// });

// // 请求拦截器
// service.interceptors.request.use(
//   config => {
//     // 设置一个超时定时器
//     const timeout = setTimeout(() => {
//       Message.error('请求超时，请重试！'); // 发出警告
//     }, 10000); // 超时时间为 10 秒

//     // 请求完成后清除定时器
//     config.cancelToken = new axios.CancelToken(cancel => {
//       config.cancel = cancel;
//     });
//     config.timeout = 10000;
//     config._timeout = timeout;
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// // 响应拦截器
// service.interceptors.response.use(
//   response => {
//     // 请求完成后清除定时器
//     clearTimeout(response.config._timeout);
//     return response;
//   },
//   error => {
//     // 请求完成后清除定时器
//     clearTimeout(error.config._timeout);

//     // 处理请求超时错误
//     if (error.code === 'ECONNABORTED') {
//       Message.error('请求超时，请重试！'); // 发出警告
//       return Promise.reject(error);
//     }

//     // 处理其他错误
//     Message.error(error.message); // 发出错误提示
//     return Promise.reject(error);
//   }
// );

// export default service;

new Vue({
  store,
  render: h => h(App),
  router: router
}).$mount('#app');
