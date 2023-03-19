<template>
    <el-card style="height: 100%;">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="输入文本">
          <el-input type="textarea" v-model="form.content" :autosize="{ minRows: 5, maxRows: 10}" @input="discover"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addText">立即创建</el-button>
          <el-button @click="toggleImage">
            {{ imag ? '隐藏图片' : '显示图片' }}
        </el-button>
        </el-form-item>
      </el-form>
      <Images v-if="imag"></Images>
    </el-card>
  </template>
  
  <script>
  import store from "@/store/store";
  import axios from "axios";
  import Images from "./image.vue";
  
  export default {
    components: { Images },
    data() {
      return {
        form: {
          title: "",
          content: "",
        },
        imag: false,
      };
    },
    methods: {
        async addText() {
        await axios({
          method: "POST",
          url: "http://localhost:8080/api/image/create",
          data: this.form.content,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
          .then((response) => {
            console.log(this.form.content);
          })
          .catch((error) => {
            console.log(error);
          });
        this.imag = true;
      },
      toggleImage() {
        this.imag = !this.imag;
      },
      discover() {
        this.imag=false;
      }
    },
  };
  </script>
  
  <style scoped>
  .el-card {
    width: 100%;
  }
  </style>
  