const Router=require('koa-router')
const router=new Router({prefix:'/api/users'})

const {login,register,update,delOne,list,listById}=require('../controller/users')
const auth=require('../utils/middleware')
router.get('/',list)
router.post('/',register)
router.get('/:id',listById)
router.patch('/:id',auth,update)
router.delete('/:id',auth,delOne)
router.post('/login',login)

module.exports=router;
