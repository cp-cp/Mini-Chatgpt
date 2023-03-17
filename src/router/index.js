import VueRouter from "vue-router";
import Vue from "vue";
import MainTalks from "../components/MainTalk.vue"
import Quest from "../components/Quest.vue"
import AddAnswer from "../components/AddAnswer.vue"
import LikeRank from "../components/LikeRank.vue"
import MyLikedQuestion from "../components/MyLikedQuestion.vue"
import AllQuestionList from "../components/QuestionList.vue"
import Login from "../components/Login.vue"
import store from '../store/store.js';
import mainpage from '../components/MainPage.vue'
import AddQuestion from '../components/AddQuestion.vue'
import MyAskedQuestionList from '../components/MyAskedQuestion.vue'
import AskRank from '../components/AskRank.vue'
import History from '../components/History.vue'

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
                    children:[
                        {path:'/mylikedquestlist',component:MyLikedQuestion,},
                        {path:'/myaskedquestlist',component:MyAskedQuestionList,},
                        {path:'/allquestlist',component:AllQuestionList,},
                        {path:'/addquestion',component:AddQuestion,},
                    ]
                },
                {path: '/ans',component:AddAnswer},
                {path: '/likerank',component:LikeRank},
                {path: '/askrank',component:AskRank},
                {path: '/history',component:History},
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