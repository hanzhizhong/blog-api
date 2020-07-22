const express=require('express')
const router=express.Router();

const User=require('../controller/api/users')
const loginCheck=require('../validator/logincheck')

router.get('/all',User.all)
router.get('/one',User.one)
router.post('/login',User.login)
router.post('/loginOut',User.loginOut)
router.post('/add',loginCheck,User.add)
router.delete('/del',loginCheck,User.del)
router.delete('/delAll',loginCheck,User.delAll)
router.post('/update',loginCheck,User.update)

module.exports=router; 