import VueRouter from "vue-router";
import Vue from "vue";
import MainTalks from "../components/MainTalk.vue"
import Quest from "../components/Quest.vue"
import Ans from "../components/Ans.vue"
import Hot from "../components/Hot.vue"

Vue.use(VueRouter)

const router= new VueRouter({
    routes: [
        {path: '/',component:MainTalks},
        {path: '/talk',component:MainTalks},
        {path: '/quest',component:Quest},
        {path: '/ans',component:Ans},
        {path: '/hot',component:Hot},
    ]
}
)

export default router