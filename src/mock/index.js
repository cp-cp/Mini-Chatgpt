import Mock from 'mockjs'
Mock.mock('/questions/all',{
    'data|3-5':[
        {
            quest: '@cname',
            ans: '@integer(0,100)'
        }
    ]
})