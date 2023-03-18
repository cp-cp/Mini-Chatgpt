<template>
    <div>
      <el-button @click="logout">Logout</el-button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import store from '@/store/store';
  
  export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
    }
},
    methods: {
      logout() {
        axios.get(`http://localhost:8080/user/logout/${store.state.userid}`)
          .then(response => {
            // 如果成功，重定向到登录页面
            if (response.status === 200) {
              window.location.href = '/login';
            }
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
  };
  </script>
  