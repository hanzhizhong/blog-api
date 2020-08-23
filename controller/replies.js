const {Reply,Blog}=require('../db/mysql/models')


class ReplyController{
    async list(cxt){
        cxt.body=await Reply.findAll({where:{...cxt.query}})
    }
    async create(cxt){
        cxt.verifyParams({
            blog_id:{type:"integer",required:true},
            content:{type:"string"}
        })
        let blog=await Blog.findByPk(cxt.request.body.blog_id)

        if(!blog){
            cxt.throw(404,'回复的博客不存在')
        }
        let count=blog.get('replies_count')
        blog.set('replies_count',count+1)
        console.log('blog',blog)
        await blog.save()
        cxt.body=await Reply.create({...cxt.request.body,user_id:cxt.state.user.id})
    }
}

module.exports=new ReplyController()