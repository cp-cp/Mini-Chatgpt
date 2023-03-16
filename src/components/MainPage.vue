<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <!-- <router-link to="/talk">
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
          <hr> -->
        <el-menu default-active="2" class="el-menu-vertical-demo" 
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

          <el-menu-item index="1">
            <router-link to="/talk">
              <i class="el-icon-s-comment" style="color: white;margin-right: 10px;"></i>
              <span>Main Talk</span>
            </router-link>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-question" style="color: white;margin-right: 10px;"></i>
              <span>Question</span>
            </template>
            <el-menu-item-group>
              <template slot="title">问题列表</template>
              <router-link to="/allquestlist">
                <el-menu-item index="1-1">问题大厅</el-menu-item>
              </router-link>
              <router-link to="/mylikedquestlist">
                <el-menu-item index="1-2">我的喜欢</el-menu-item>
              </router-link>
              <router-link to="/myaskedquestlist">
                <el-menu-item index="1-2">我的提问</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group title="Add">
              <router-link to="/addquestion">
                <el-menu-item index="1-3">添加问题</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="3">
            <router-link to="/ans">
              <i class="el-icon-edit" style="color: white;margin-right: 10px;"></i>
              <span>Answer</span>
            </router-link>
          </el-menu-item>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-question" style="color: white;margin-right: 10px;"></i>
              <span>Hot</span>
            </template>
            <el-menu-item-group>
              <template slot="title">热榜</template>
              <router-link to="/likerank">
                <el-menu-item index="4-1">点赞排行</el-menu-item>
              </router-link>
              <router-link to="/askrank">
                <el-menu-item index="4-2">回答排行</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          

          <el-menu-item index="5">
            <router-link to="/logout">
              <i class="el-icon-s-opportunity" style="color: white;margin-right: 10px;"></i>
              <span>Logout</span>
            </router-link>
          </el-menu-item>
        </el-menu>

      </el-aside>
      <!-- <keep-alive> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
      <!-- <MainTalks v-if="mount==-1"></MainTalks>
          <Quest v-else-if="mount==1"></Quest> -->
    </el-container>
  </div>
</template>
  
<script>
export default {
  components: {
  },
  methods: {
    rpplus() {
      this.mount = this.mount * (-1);
      console.log(this.mount);
    }
  },
  data() {
    return {
      mount: 1,
    }
  },
}
</script>
  
<style>
.el-header,
.el-footer {
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
  /* text-align: center; */
  line-height: 40px;
}

body>.el-container {
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

a {
  text-decoration: none;
  color: #fff;
}
</style>
<style type="text/css">
html,
body,
#app,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
</style>