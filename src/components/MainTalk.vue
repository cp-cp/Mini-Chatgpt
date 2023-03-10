<template>
    <el-container>
        <el-header>
            什么都没有
        </el-header>
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
         <Input @my-event="onMyEvent" ref="sendInput"></Input>
        </el-footer>        
    </el-container>
</template>

<script>
import Input from './Input.vue';
export default {
    components: { 
        Input,
    },
    data() {
        return {
        isMainRendered: false, 
        cards: [{ title: '1', body: '我能帮你什么?' }],
        message:{message:""}
        }
    },
    methods: {
        wait(delay) {
            return new Promise(resolve => {
                setTimeout(resolve, delay)
            })
            },
        async onMyEvent(payload) {
            const button = this.$refs.sendInput.$refs.sendTo;
            button.disabled = true;
            this.message=payload;
            console.log(payload);
            this.cards.push(
                { title: '2', body: this.message.message }
            );
            await this.wait(500);
            button.disabled=false;
            this.cards.push(
                {title:'1',body: "hi"}
            )     
            const elMain = document.querySelector('.el-main');
            // 在下一次 DOM 更新循环结束后执行自动滚动的代码
            this.$nextTick(() => {
            this.isMainRendered = true;
            // 如果 el-main 组件存在，则自动滚动到最下面
            if (elMain) {
                elMain.scrollTop = elMain.scrollHeight;
            }       
            })
         },
    }
}
</script>

<style>

</style>