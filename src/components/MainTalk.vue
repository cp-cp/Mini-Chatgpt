<template>
    <el-container>
        <el-header>
            什么都没有
            <el-button style="float: right;margin:10px;" @click="saveCards">储存对话</el-button>
        </el-header>
        <el-main class="chat-message">
            <el-scrollbar wrap-class="chat-area">
                <div class="chat-messages">
                    <div :key="index" v-for="(card, index) in cards">
                        <!--欢迎词-->
                        <div v-if="card.title === '0'">
                            <Card v-if="card.title === '0'" style="width: 300px;height: auto;margin-left: 20px;"
                                shadow="hover" @text-complete="handleTextComplete" @text-loading="handleTextLoading"
                                :content="card.body">
                            </Card>
                        </div>
                        <!--没有这个问题-->
                        <div v-if="card.title === '5'">
                            <Card v-if="card.title === '5'" style="width: 300px;height: auto;margin-left: 20px;"
                                shadow="hover" @text-complete="handleTextComplete" @text-loading="handleTextLoading"
                                :content="card.body">
                            </Card>
                        </div>
                        <div v-if="card.title === '3'">
                            <router-link :to="{ path: '/addquestion', query: { quest: card.body } }">
                                <el-button style="margin-left:20px;text-align: left;width: 100px;">添加问题</el-button>
                            </router-link>
                        </div>
                        <!--问题回答-->
                        <div>
                            <Card v-if="card.title === '1'" style="width: 300px;height: auto;margin-left: 20px;"
                                shadow="hover" @text-complete="handleTextComplete" @text-loading="handleTextLoading"
                                :content="card.body">
                            </Card>
                            <div style="display: flex; flex-wrap: wrap;">
                                <like v-if="card.title === '4'" :questionId="card.questionId"></like>
                                <router-link v-if="card.title === '4'" :to="{ path: '/ans', query: { quest: card.body } }">
                                    <el-button style="margin-left:20px;text-align: left;width: 100px;">添加答案</el-button>
                                </router-link>
                            </div>
                        </div>

                        <!--我的提问-->
                        <div v-if="card.title === '2'">
                            <el-card
                                style="width: 300px;height: auto;margin-left: auto;margin-right: 20px;margin-top: 20px;"
                                shadow="hover">
                                <div class="text item" style="">
                                    {{ card.body }}
                                </div>
                            </el-card>
                        </div>
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
import Like from './Like.vue';
import store from '@/store/store';
export default {
    components: {
        Input,
        Card,
        Like
    },
    data() {
        return {
            isMainRendered: false,
            cards: [{ title: '0', body: '我能帮你什么?', questionId: 1 }],
            message: { message: "" }
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
                    url: 'http://localhost:8080/questions/findByTitle',
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
            const ans = await this.findAns(this.message.message);
            const quest = this.message.message;
            //console.log(ans);
            //console.log(ans.length);
            if (ans.length) {
                //console.log(ans[0].answers.length)
                console.log(ans[0].id);
                if (ans[0].answers.length != 0) {
                    await this.cards.push(
                        { title: '1', body: ans[0].answers[0].content, questionId: ans[0].id }
                    )
                    await this.cards.push(
                        { title: '4', body: ans[0].title, questionId: ans[0].id }
                    )
                }
                else {
                    await this.cards.push(
                        { title: '1', body: "目前无答案。", questionId: ans[0].id }
                    )
                    await this.cards.push(
                        { title: '4', body: ans[0].title, questionId: ans[0].id }
                    )
                }
            }
            else {
                await this.cards.push(
                    { title: '5', body: "目前没有这个问题。" }
                )
                await this.cards.push(
                    { title: '3', body: this.message.message, }
                )
            }
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
        },
        saveCards() {
            //const data = JSON.stringify(this.cards.slice(1).map(card => card.body));
            const filteredCards = this.cards.filter(card => card.title === '1' || card.title === '2'|| card.title === '5')
            const contentArray = filteredCards.map(card => card.body)
            const data = contentArray;//JSON.stringify(contentArray)
            console.log(data);
            axios.post(`http://localhost:8080/history/store/${store.state.userid}`, data, {
                // headers: {
                //     'Content-Type': 'application/json'
                // }
            })
                .then(response => {
                    alert("保存成功")
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>

<style>
.el-card {
    height: auto;
    /* 自动调整高度 */
}

.card-content p {
    white-space: pre-wrap;
    /* 保留空白符并自动换行 */
    word-wrap: break-word;
    /* 在单词内换行 */
}
</style>