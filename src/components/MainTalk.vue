<template>
    <el-container>
        <el-header>
            什么都没有
        </el-header>
        <el-main class="chat-message">
            <el-scrollbar wrap-class="chat-area">
                <div class="chat-messages">
                    <div :key="index" v-for="(card, index) in cards">
                        <Card v-if="card.title === '1'" 
                            style="width: 300px;height: auto;margin-left: 20px;"
                            shadow="hover"
                            @text-complete="handleTextComplete"
                            @text-loading="handleTextLoading"
                            :content="card.body">
                            <!-- <div class="text item" style="">
                                {{ card.body }}
                            </div> -->
                        </Card>
                        <el-card v-if="card.title === '2'"
                            style="width: 300px;height: auto;margin-left: auto;margin-right: 20px;margin-top: 20px;"
                            shadow="hover">
                            <div class="text item" style="">
                                {{ card.body}}
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
import Card from './Card.vue';
import axios from 'axios';
export default {
    components: {
        Input,
        Card
    },
    data() {
        return {
            isMainRendered: false,
            cards: [{ title: '1', body: '我能帮你什么?' }],
            message: { message:null }
        }
    },
    methods: {
        wait(delay) {
            return new Promise(resolve => {
                setTimeout(resolve, delay)
            })
        },
        findAns(messages) {
            // 将 axios.get 包装为 Promise，并返回 Promise 实例
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url:'http://localhost:8080/questions/findByContent',
                    data: messages,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                })
                    .then(response => {
                        //console.log(response.data);
                        resolve(response.data); // 将响应数据传递给 resolve 函数
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error); // 将错误对象传递给 reject 函数
                    });
            });
        },
        async onMyEvent(payload) {
            const button = this.$refs.sendInput.$refs.sendTo;
            //button.disabled = true;//记得打开
            this.message = payload;
            this.cards.push(
                { title: '2', body: this.message.message }
            );
            await this.wait(500);
            const ans=await this.findAns(this.message.message);
            if(ans.lenth){
                if(ans[0].answers.lenth){
                    console.log(ans[0].answers[0].content);
                    await this.cards.push(
                        {title: '1', body: ans[0].answers[0].content}
                    )
                }
                else{
                    await this.cards.push(
                        { title: '1', body: "目前无答案。"}
                    )

                }                
            }
            else{
                    await this.cards.push(
                        { title: '1', body: "目前没有这个问题。"}
                    )
            }
            const elMain = document.querySelector('.el-main');
            // 在下一次 DOM 更新循环结束后执行自动滚动的代码
            this.$nextTick(() => {
                this.isMainRendered = true;
                // 如果 el-main 组件存在，则自动滚动到最下面
                if (elMain) {
                    elMain.scrollTop = elMain.scrollHeight;
                }
            })
            //button.disabled= false;//记得打开
        },
        handleTextLoading() {
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
        handleTextComplete() {
            const elMain = document.querySelector('.el-main');
            // 在下一次 DOM 更新循环结束后执行自动滚动的代码
            this.$nextTick(() => {
                this.isMainRendered = true;
                // 如果 el-main 组件存在，则自动滚动到最下面
                if (elMain) {
                    elMain.scrollTop = elMain.scrollHeight;
                }
            })
            const button = this.$refs.sendInput.$refs.sendTo;
            //button.disabled = false;//记得打开
        }
    }
}
</script>

<style>
    .el-card {
        height: auto; /* 自动调整高度 */
    }
    .card-content p {
        white-space: pre-wrap; /* 保留空白符并自动换行 */
        word-wrap: break-word; /* 在单词内换行 */
    }
</style>