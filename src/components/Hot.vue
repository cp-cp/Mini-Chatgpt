<template>
    <el-card style="weight: 100%;">
    <h3>问题排行榜</h3>
    <el-table :data="questions"  
        stripe
        height="550px"
        border>
      <el-table-column label="排名" width="80">
        <template slot-scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">{{scope.row.title}}</template>
      </el-table-column>
      <el-table-column label="点赞数" width="100">
        <template slot-scope="scope">{{scope.row.likesNumber}}</template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      questions: [],
    };
  },
  created() {
    this.getQuestions();
  },
  methods: {
    getQuestions() {
      axios.get('http://localhost:8080/questions/all').then((response) => {
        this.questions = response.data.sort((a, b) => b.likesNumber - a.likesNumber);
      });
    },
  },
};
</script>
<style scoped>
  .el-card{
    margin: 10px;
    width: 100%;
  }
</style>