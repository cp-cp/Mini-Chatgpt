<template>
    <div>
      <el-button @click="handleButtonClick">点击我</el-button>
    </div>
</template>
<script>
import axios from 'axios'
    export default {
    methods: {
        handleButtonClick() {
          axios
            // 3.1url地址
            .get("http://localhost:8080/questions/all")
            // 3.2成功时回调函数
            .then((data) => {
              
            })
            //3.3失败时回调函数
            .catch((err) => {
              console.log(err);
            });
        },
    }
  }
</script>