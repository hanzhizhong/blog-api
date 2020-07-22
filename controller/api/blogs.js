const express=require('express')
const blogApi = require('../..')
let router=express.Router()

const {getAllBlogList,getCurrentUserBlog,getDetailContentById,addNewBlog,updateBlogById,removeBlogById}=require('../../model/blogs')

const {SuccessInfoModel,ErrorInfoModel}=require('../../utils/answer')
const BValidator=require('../../validator/blog-validator')

class Blog{
    async list(req,res){
        let ret=await getAllBlogList()
        if(typeof ret==='string'){
            res.json(new ErrorInfoModel(ret,500,500))
            return 
        }
        res.json(new SuccessInfoModel(ret))
    }
    async belong(req,res){
        let {user}=req.params;
        let ret=await getCurrentUserBlog(user)
        if(typeof ret==='string'){
            res.json(new ErrorInfoModel(ret,500,500))
            return 
        }
        res.json(new SuccessInfoModel(ret))
        
    }
    async detail(req,res){
        let {id}=req.query;
        BValidator.detail(res,id)
        let ret=await getDetailContentById(id)
        if(typeof ret==='string'){
            res.json(new ErrorInfoModel(ret,500,500))
            return 
        }
        res.json(new SuccessInfoModel(ret))
    }
    async add(req,res){
        let {title,content}=req.body;
        BValidator.add(res,{title,content});
        let username=req.session.username;
        let ret=await addNewBlog({username,title,content})
        if(typeof ret==='string'){
            res.json(new ErrorInfoModel(ret,500,500))
            return 
        }
        res.json(new SuccessInfoModel('数据插入成功'))
    }
    async update(req,res){
        let {id,title,content}=req.body;

        BValidator.update(res,{id,title})
        let ret=await updateBlogById({id,username:req.session.username,title,content})
        console.log('update ret',ret)
        if(typeof ret==='string'){
            res.json(new ErrorInfoModel(ret,500,500))
            return 
        }
        res.json(new SuccessInfoModel('数据更新成功'))
    }
    async remove(req,res){
        let {id}=req.query;
        BValidator.detail(res,id)
        let ret=await removeBlogById(id)
        if(typeof ret==='string'){
            res.json(new ErrorInfoModel(ret,500,500))
            return 
        }
        console.log('ret',ret)
        res.json(new SuccessInfoModel('删除成功'))
    }
}

module.exports=new Blog();