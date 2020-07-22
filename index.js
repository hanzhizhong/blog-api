const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const session=require('express-session')
const {ErrorInfoModel}=require('./utils/answer')
//导入路由模块
const userRouter=require('./router/users')
const blogRouter=require('./router/blogs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//配置session 
app.use(session({
    secret:'nothing seek,nothing find',
    name:'blogs_id',
    resave:false,
    saveUninitialized:true,
    cookies:{
        maxAge:60*60*1000
    }
}))


app.use('/api/users',userRouter)
app.use('/api/blogs',blogRouter)

app.use((req,res)=>{
    res.json(new ErrorInfoModel('page not found',404))
})

module.exports={
    app
}