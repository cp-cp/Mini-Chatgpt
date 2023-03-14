
import QuestionList from './QuestionList.vue';

<template>
  <el-container>
        <el-main>
            <!-- <keep-alive> -->
              <router-view></router-view>
            <!-- </keep-alive> -->
        </el-main>
        <el-footer>
            <router-link to="/myquestlist">
                My Question List
            </router-link>
            <router-link to="/allquestlist">
                All Question List
            </router-link>

            <router-link :to="{ path: '/addquestion'}">
                Add Question
            </router-link>
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