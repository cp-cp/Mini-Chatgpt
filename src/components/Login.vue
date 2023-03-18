<template>
  <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-form">
    <h2 class="title">Welcome to My App</h2>
    <el-form-item label="Username" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: 'Please enter username', trigger: 'blur' }],
        password: [{ required: true, message: 'Please enter password', trigger: 'blur' }]
      }
    };
  },
  methods: {
    ...mapMutations(['setIsAuthenticated', 'setUserName', 'setUserId']),
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          axios.post('http://localhost:8080/user/login', this.form, { timeout: 5000 })
            .then(response => {
              if (response.status === 200) {
                // 登录成功，更新isAuthenticated状态并跳转到主页
                //localStorage.setItem('isAuthenticated', 'true');
                this.setIsAuthenticated(true);
                this.setUserName(this.form.username);
                this.setUserId(response.data.userId);
                this.$router.push({ name: 'mainpage' });
              } else {
                // 登录失败，弹出提示框
                alert("登陆失败");
                this.$message.error(response.message);
              }
            })
            .catch(error => {
              if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
              } else {
                console.log(error);
                this.$message.error('Failed to login, please try again later.');
              }
              // 请求超时处理
              if (error.code === 'ECONNABORTED') {
                alert('请求超时，请稍后再试！');
              }
            });

        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #ccc;
}

.title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.el-form-item__label {
  color: #333;
}

.el-input__inner {
  border-radius: 5px;
  border: 1px solid #ccc;
}

.el-button {
  width: 100%;
  margin-top: 20px;
  border-radius: 5px;
  background-color: #409eff;
  border: none;
}

.el-button:hover {
  background-color: #66b1ff;
}

.el-message-box__title {
  color: #409eff;
}

.el-message-box__message {
  color: #333;
}
</style>
