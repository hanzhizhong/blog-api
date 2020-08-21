const Router=require('koa-router')
const router=new Router({prefix:'/api/blogs'})
const {list,create,delOne,updateOne,listById,checkUser,checkBlogIsExist}=require('../controller/blogs')
let auth=require('../utils/middleware')

router.get('/',list)
router.post('/',auth,create)
router.delete('/:id',auth,checkBlogIsExist,checkUser,delOne)
router.patch('/:id',auth,checkBlogIsExist,checkUser,updateOne)
router.get('/:id',listById)

module.exports=router; 