<template>
    <el-card style="weight: 100%;">
      <h3>提问排行榜</h3>
      <el-table :data="users" stripe height="550px" border>
        <el-table-column label="排名" width="80">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="提问数" width="100">
          <template slot-scope="scope">{{ scope.row.num }}</template>
        </el-table-column>
      </el-table>
    </el-card>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        questions: [],
        users: [],
      };
    },
    async created() {
      await this.getUser();
      this.updateUsers();
    },
    methods: {
      async getUser() {
        try {
          const response = await axios.get("http://localhost:8080/user/all");
          this.users = response.data;
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      },
      async updateUsers() {
        try {
          for (let i = 0; i < this.users.length; i++) {
            const response = await axios.get(
              `http://localhost:8080/user/askedQuestions/${this.users[i].id}`
            );
            console.log(response.data.length);
            this.$set(this.users[i], "num", response.data.length);
            this.users.sort((a, b) => {
                if (a.num < b.num) {
                    return 1;
                } else if (a.num > b.num) {
                    return -1;
                } else {
                    return 0;
                }
            });
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .el-card {
    margin: 10px;
    width: 100%;
  }
  </style>
  