const Router=require('koa-router')
const router=new Router({prefix:'/api/replies'})

const {list}=require('../controller/replies')

router.get('/',list)
router.post('/',create)
module.exports=router;