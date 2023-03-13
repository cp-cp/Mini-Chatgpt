import VueRouter from "vue-router";
import Vue from "vue";
import MainTalks from "../components/MainTalk.vue"
import Quest from "../components/Quest.vue"
import Ans from "../components/Ans.vue"
import Hot from "../components/Hot.vue"
import MyQuestionList from "../components/MyQuestion.vue"
import AllQuestionList from "../components/QuestionList.vue"
import Login from "../components/Login.vue"
import store from '../store/store.js';
import mainpage from '../components/MainPage.vue'

Vue.use(VueRouter)

const router= new VueRouter({
    routes: [
        {path:'/',component:Login,},
        {path:'/mainpage',
            component:mainpage,
            children:[
                {path: '',component:MainTalks,name:'mainpage',}, 
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
            ],
        },
        {path:'/login',component:Login,name:'login'}
    ]
});

router.beforeEach((to, from, next) => {
//    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (to.name!='login'&&(!store.state.isAuthenticated))//||isAuthenticated)) 
        next({name:"login"})
    else next()
  })
export default router