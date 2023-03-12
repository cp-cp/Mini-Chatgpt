
import QuestionList from './QuestionList.vue';

<template>
  <el-container>
        <el-main class="chat-message">
        <QuestionList></QuestionList>
        </el-main>
        <el-footer class="chat-input">
        </el-footer>
    </el-container>
</template>
<script>
import QuestionList from './QuestionList.vue';
export default {
    components: { 
        QuestionList
    },
}
</script>

<style>
</style>