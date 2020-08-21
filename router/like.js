const Router=require('koa-router')
const router=new Router({prefix:'/api/likes'})

const {create}=require('../controller/likes')
const auth=require('../utils/middleware')

router.post('/',auth,create)

module.exports=router;

