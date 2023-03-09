<template>
  <div id="app">
  <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>        
      </el-aside>
      <el-container>
        <el-header><h1>Welcome to Mini-Chat</h1></el-header>
        <el-main class="chat-message">
          <el-scrollbar wrap-class="chat-area">
            <div class="chat-messages">
              <div :key="index"  v-for="(card, index) in cards" >
                <el-card v-if="card.title==='1'" style="width: 300px;height: auto;margin-left: 20px;"  shadow="hover">
                  <div  class="text item" style="">
                    {{ card.body }}
                  </div>
                </el-card>                
                <el-card v-if="card.title==='2'" style="width: 300px;height: auto;margin-left: auto;margin-right: 20px;margin-top: 20px;"  shadow="hover">
                  <div  class="text item" style="">
                    {{ card.body }}
                  </div>
                </el-card>
              </div>
            </div>
          </el-scrollbar>
        </el-main>
        <el-footer class="chat-input">
          <Input @my-event="onMyEvent"></Input>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Input from './components/Input.vue';
import Input1 from './components/Input_1.vue';
import Button from './components/Button.vue';
export default {
  components: { 
    Input,
    Input1,
    Button
  },
  data() {
    return {
      isMainRendered: false, 
      cards: [{ title: '1', body: '我能帮你什么?' }],
      message:{message:""}
    }
  },
  methods: {
    onMyEvent(payload) {
//       console.log('Received my-event from MyComponent:', payload)
//       const div = document.createElement('el-card');
//       //div.textContent = 'New Div';
//       this.$el.appendChild(div);
//       this.$el.querySelector('.chat-messages').appendChild(div)
        this.message=payload;
        console.log(this.message);
        this.cards.push(
          { title: '2', body: this.message.message }
        );
       // this.scrollTop();
      const elMain = document.querySelector('.el-main');
      // 在下一次 DOM 更新循环结束后执行自动滚动的代码
      this.$nextTick(() => {
        this.isMainRendered = true;
        // 如果 el-main 组件存在，则自动滚动到最下面
        if (elMain) {
          elMain.scrollTop = elMain.scrollHeight;
        }
      });
    },
  },
  mounted() {
//    this.$on('sendMessage', this.addMessage);
  },
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
.text {
    font-size: 14px;
  }

  .box-card {
    width: 480px;
  }
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
    line-height: 100vh;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
    line-height: 20px;
    height: 350px;

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