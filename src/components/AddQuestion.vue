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
                <el-button type="primary" @click="addQuestion">立即创建</el-button>
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
            }
        }
    },
    methods: {
        addQuestion() {
            this.question.asker=store.state.username;
            this.question.content=this.form.content;
            this.question.title=this.form.title;
            axios.post('http://localhost:8080/questions/addQuest', this.question)
            .then(response => {
              if (response.status === 200) {
                alert("添加成功");
              } else {
                console.log(response)
                this.$message.error(response.message);
              }
            })
            .catch(error => {
              console.log(error);
              this.$message.error('Failed to login, please try again later.');
            });
        }
    },
    mounted(){
        this.form.title = this.$route.query.quest;
    },
    activated() {
        this.form.title = this.$route.query.quest;
    }
}
</script>