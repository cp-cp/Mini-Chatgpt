<template>
  <div>
    <el-autocomplete
    ref="input"
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入内容"
    @keyup.enter.native="changed"
    @select="handleSelect"
    value-key	="quest"
    clearable
    placement="top-start"
    :style="{ width: '400px' }"
    ></el-autocomplete>
    <el-button @click="sendMessage">发送</el-button>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        restaurants: [],
        questions: [],
        state: '',
        timeout:  null
      };
    },
    methods: {
      loadAll() {
        var data;
        axios.get('http://localhost:8080/questions/all')
        .then(response => {
          this.questions=response.data;
        })
        .catch(error => {
          console.log(error);
        });
        //const results = response.data;
        //this.questions=results;
        return [];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var questions=this.questions;
        console.log(questions);
        var results = questions;//queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 700 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.disabled=true;
        console.log(item);
      },
      changed(){
//        this.$refs.autocomplete.suggestions = [];
        this.state='';
      },
      sendMessage(){
        this.$emit('my-event', { message: this.state })
        //alert(this.state);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  };
</script>
<style>
  el-autocomplete
  {
    width: 1000px;
  }
</style>