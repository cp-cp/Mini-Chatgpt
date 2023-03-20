<template>
  <div>
    <el-autocomplete ref="input" v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"
      @keydown.enter.native="changed" @select="handleSelect" value-key="title" clearable placement="top-start"
      :style="{ width: '400px' }"></el-autocomplete>
    <el-button @click="sendMessage" ref="sendTo" :disabled="IsDisabled" style="margin-left: 10px;">发送</el-button>
  </div>
</template>
<script>
import axios from 'axios';
import { computed } from 'vue';
export default {
  data() {
    return {
      restaurants: [],
      questions: [],
      state: '',
      timeout: null
    };
  },
  methods: {
    loadAll() {
      axios.get('http://localhost:8080/questions/all')
        .then(response => {
          this.questions = response.data;
          //console.log(this.questions);
        })
        .catch(error => {
          // alert("对不起");
        });
      return [];
    },
    querySearchAsync(queryString, cb) {
      var questions = this.questions;
      var results = queryString ? questions.filter(this.createStateFilter(queryString)) : questions;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 700 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    handleSelect(item) {
      this.disabled = true;
      //console.log(item);
    },
    changed() {
      if (this.$refs.sendTo.disabled) return;
      this.sendMessage();
      this.state = '';
    },
    sendMessage() {
      this.$emit('my-event', { message: this.state })
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  computed: {
    IsDisabled() {
      return (this.state.length === 0);
    }
  }
};
</script>
<style>
el-autocomplete {
  width: 1000px;
}
</style>