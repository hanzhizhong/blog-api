const Router=require('koa-router')
const router=new Router({prefix:'/api/users'})

router.get('/',async cxt=>{
    cxt.body='获取所有的用户信息'
})
router.post('/',async cxt=>{
    cxt.body='注册或者增加新用户'
})
router.get('/:id',async cxt=>{
    cxt.body='获取id值的用户信息'
})
router.patch('/:id',async cxt=>{
    cxt.body='修改id值的用户'
})
router.delete('/:id',async cxt=>{
    cxt.body='删除id值的用户'
})
router.post('/login',async cxt=>{
    cxt.body='用户登陆接口'
})

module.exports=router;
