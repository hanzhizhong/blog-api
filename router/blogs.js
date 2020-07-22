const express=require('express')
const router=express.Router()

const Blog=require('../controller/api/blogs')
const loginCheck=require('../validator/logincheck')
router.get('/list',Blog.list)
router.get('/list/:user',Blog.belong)
router.get('/detail',Blog.detail)
router.post('/add',loginCheck,Blog.add)
router.post('/update',loginCheck,Blog.update)
router.delete('/delete',loginCheck,Blog.remove)

module.exports=router; 