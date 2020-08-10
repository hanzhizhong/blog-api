const Koa=require('koa')
const app=new Koa()

const Router=require('koa-router')
const router=new Router()
const parameter=require('koa-parameter')
const jsonError=require('koa-json-error')

const userRouter=require('./router/user')
//const blogRouter=require('./router/blog')

app.use(jsonError({
    postFormat:(e,{stack,...rest})=>{
        return process.en.NODE_ENV==='production'?rest:{stack,...rest}
    }
}))
app.use(parameter(app))

router.use(userRouter.routes())
//router.use()

app.use(router.routes())
app.use(router.allowedMethods())

module.exports={app};
