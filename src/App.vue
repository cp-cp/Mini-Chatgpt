<template>
  <div id="app">
  <el-container>
      <el-aside width="200px">
        <router-link to="/talk">Main Talk</router-link>
        <hr>
        <router-link to="/quest">Quest</router-link>
        <hr>
        <router-link to="/ans">Ans</router-link>
      </el-aside>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        <!-- <MainTalks v-if="mount==-1"></MainTalks>
        <Quest v-else-if="mount==1"></Quest> -->
    </el-container>
  </div>
</template>

<script>
import Input from './components/Input.vue';
import MainTalk from './components/MainTalk.vue';
import Quest from './components/Quest.vue';
export default {
  components: { 
    Input,
    MainTalk,
    Quest
  },
  methods: {
    rpplus(){
      this.mount=this.mount*(-1);
      console.log(this.mount);
    }
  },
  data() {
    return{
      mount: 1,
    }
  },
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 190px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 40px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
<style type="text/css">
/*
	找到html标签、body标签，和挂载的标签
	都给他们统一设置样式
*/
  html,body,#app,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
         /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }
</style>