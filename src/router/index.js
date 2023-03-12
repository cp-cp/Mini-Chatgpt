import VueRouter from "vue-router";
import Vue from "vue";
import MainTalks from "../components/MainTalk.vue"
import Quest from "../components/Quest.vue"
import Ans from "../components/Ans.vue"
import Hot from "../components/Hot.vue"
import MyQuestionList from "../components/MyQuestion.vue"
import AllQuestionList from "../components/QuestionList.vue"

Vue.use(VueRouter)

const router= new VueRouter({
    routes: [
        {path: '/',component:MainTalks},
        {path: '/talk',component:MainTalks},
        {path: '/quest',
            component:Quest,
            children:[{
                path:'/myquestlist',component:MyQuestionList,
                path:'/allquestlist',component:AllQuestionList,
            }]
        },
        {path: '/ans',component:Ans},
        {path: '/hot',component:Hot},
    ]
}
)

export default router