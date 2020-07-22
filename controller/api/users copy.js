const express=require('express')
let router=express.Router()

const {format}=require('date-fns')
const md5=require('md5')
const {getAllUsersInfo,insertOne,selectOne,deleteOne,updateOne, deleteAll,isExistOne}=require('../ctrl/users')
const {ErrorInfoModel,SuccessInfoModel}=require('../answermodel/answer')
const {secret}=require('../conf/config')
router.get('/all',async (req,res)=>{
    let ret=await getAllUsersInfo()
    if(typeof ret==='string'){
        res.json(new ErrorInfoModel(ret,500,500)) 
        return 
    }
    res.json(new SuccessInfoModel(ret))
})
//获取一条
router.get('/one',async (req,res)=>{
    let {id}=req.query;
    let ret=await selectOne({id})
    if(typeof ret==='string'){
        res.json(new ErrorInfoModel(ret,500,500))
        return 
    }
    res.json(new SuccessInfoModel(ret))
})
//登陆
router.post('/login',async (req,res)=>{
    let {username,passwd}=req.body
    passwd=md5(secret+passwd)
    let ret=await selectOne({username,passwd})
    req.session.username=username;
    console.log('ret',ret)
    if(typeof ret==='string'){
        res.json(new ErrorInfoModel(ret,500,500))
        return 
    }
    if(ret.length>0){
        res.json(new SuccessInfoModel('login success'))
    }else{
        res.json(new ErrorInfoModel('current person not exist in db, please registry first',10003))
    }

    
})
//登出 清除session
router.post('/loginOut',(req,res)=>{
    req.session.destroy((err=>{
        if(err){
            console.error('session destroy failure:',err)
            return 
        }
    }))
    res.json(new SuccessInfoModel('login out success'))
})
//添加用户
router.post('/add',async (req,res)=>{
    let {username,passwd,nickname='',gender=0,birthday=format(new Date(1992,02,12),'yyyy-MM-dd')}=req.body
    if(!username||!passwd){
        res.json(new ErrorInfoModel('username or passwd not allow empty',10000))
        return
    }
    passwd=md5(secret+passwd)
    let isExist=await isExistOne({username})
    if(isExist.length>0){
        res.json(new ErrorInfoModel('username name already exist',10001))
        return 
    }
    let ret=await insertOne({username,passwd,nickname,gender,birthday})
    if(typeof ret==='string'){
        res.json(new ErrorInfoModel(ret,500,500))
        return 
    }
    res.json(new SuccessInfoModel('add new user success'))
})

//删除用户
router.delete('/del',async (req,res)=>{
    let {id}=req.body;
    let ret=await deleteOne(id)
    console.log('ret',ret)
    if(typeof ret==='string'){
        res.json(new ErrorInfoModel(ret,500,500))
        return 
    }
    res.json(new SuccessInfoModel('delete one success'))
})

//删除全部
router.delete('/delAll',async (req,res)=>{
    let ret=await deleteAll()
    if(typeof ret==='string'){
        res.json(new ErrorInfoModel(ret,500,500))
        return 
    }
    res.json(new SuccessInfoModel('delete all success'))
})

//修改
router.put('/update',async (req,res)=>{
    let {id,username,passwd,nickname='',gender=0,birthday=format(new Date(1992,02,12),'yyyy-MM-dd')}=req.body;
    let isExist=await selectOne({id})
    if(isExist.length===0){
        res.json(new ErrorInfoModel('person not exist in this id',10003))
        return 
    }
    if(!username&&!passwd){
        res.json(new ErrorInfoModel('username or passwd not allow empty',10000))
        return 
    }
    passwd=md5(secret+passwd)
    let ret=await updateOne({id,username,passwd,nickname,gender,birthday})
    if(typeof ret==='string'){
        res.json(new ErrorInfoModel(ret,500,500))
        return 
    }
    res.json(new SuccessInfoModel('update success'))
})
module.exports=router;