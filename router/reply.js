const Router=require('koa-router')
const router=new Router({prefix:'/api/replies'})

const auth=require('../utils/middleware')
const {list,create,checkUserAuth,checkReplyExist}=require('../controller/replies')

router.get('/',list)
router.post('/',auth,create)

module.exports=router;