<template>
  <div id="app">
  <el-container>
      <el-aside width="200px">
        <router-link to="/talk">
          <i class="el-icon-s-comment" style="color: white;margin-right: 10px;"></i>
          Main Talk
        </router-link>
        <hr>
        <router-link to="/quest">
          <i class="el-icon-question" style="color: white;margin-right: 10px;"></i>
          Quest
        </router-link>
        <hr>
        <router-link to="/ans">
          <i class="el-icon-edit" style="color: white;margin-right: 10px;"></i>
          Ans
        </router-link>
        <hr>
        <router-link to="/hot">
          <i class="el-icon-s-opportunity" style="color: white;margin-right: 10px;"></i>
          Hot
        </router-link>
        <hr>
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
import Hot from './components/Hot.vue';
export default {
  components: { 
    Input,
    MainTalk,
    Quest,
    Hot
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
    background-color: #575c64;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #293037;
    color: #333;
    text-align: center;
    line-height: 120px;
  }
  .el-main {
    background-color: #ccd9e7;     
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

  .router-link-active {    
    text-decoration: none;
  }
  a{    
    text-decoration: none;
    color: #fff;
  }
</style>
<style type="text/css">
  html,body,#app,.el-container{
        padding: 0px;
        margin: 0px;
        height: 100%;
    }
</style>