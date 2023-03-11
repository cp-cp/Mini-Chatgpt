import Mock from 'mockjs'
Mock.mock('/questions/all',{
    'data|3-5':[
        {
            quest: '@cname',
            ans: '@integer(0,100)'
        }
    ]
})

// Mock.mock(/\/questions\/(\w+)/, 'get', (options) => {
//     // options 是请求相关的一些参数，其中 options.url 是请求的 URL
//     const message = options.url.match(/\/questions\/(\w+)/)[1]
//     'data':[
//         {
//             quest: '@cname',
//             ans: "@integer(0,100)"
//         }
//     ]
// })
Mock.mock('/questions/all',{
    
    'data|3-5':[
        {
            quest: '@cname',
            ans: '@cparagraph(5, 10)'
        }
    ]
})