<template>
    <el-card style="height: 100%;">
        <el-form ref="form" :model="form" label-width="80px">
            
            <el-form-item label="问题标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="问题内容" >
                <el-input type="textarea" v-model="form.content"   :autosize="{ minRows: 5, maxRows: 10}"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="addAns">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import store from '@/store/store';
import axios from 'axios';
export default {
//    props: ['quest'],
    data() {
        return {
            form: {
                title: '',
                content: ''
            },
            question: {
                content:"",
                title:"",
                asker:"",
            },
            ans : {
                questionId:0,
                solver:store.state.username,
                content:"",//this.form.content,
            }
        }
    },
    methods: {
        addAns() {
            console.log(this.ans);
            axios({
                    method: 'POST',
                    url: 'http://localhost:8080/questions/findByTitle',
                    data: this.form.title,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                    
                })
                    .then(response => {
                        //console.log(response.data[0].id);
                        this.ans.content=this.form.content;
                        this.ans.questionId=response.data[0].id
                        axios.post('http://localhost:8080/answers/addAns', this.ans)
                        .then(response => {

                        })
                        .catch(error => {
                        console.log(error);
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        //reject(error); // 将错误对象传递给 reject 函数
                    });
            //console.log(response)
        },
    },
    mounted(){
        this.form.title = this.$route.query.quest;
    },
    activated() {
        this.form.title = this.$route.query.quest;
    }
}
</script>
<style scoped>
    .el-card{
        width: 100%;
    }
</style>