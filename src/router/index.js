import VueRouter from "vue-router";
import Vue from "vue";
import MainTalks from "../components/MainTalk.vue"
import Quest from "../components/Quest.vue"
import Ans from "../components/Ans.vue"

Vue.use(VueRouter)

const router= new VueRouter({
    routes: [
        {path: '/talk',component:MainTalks},
        {path: '/quest',component:Quest},
        {path: '/ans',component:Ans},
    ]
}
)

export default router