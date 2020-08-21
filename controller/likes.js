const {Like,Blog}=require('../db/mysql/models')


class LikesController{
    async create(cxt){
        cxt.verifyParams({
            blog_id:{type:"integer",required:true}
        })
        let {blog_id}=cxt.request.body;
        let blog=await Blog.findByPk(blog_id)
        if(!blog){
            cxt.throw(404,'当前点赞的博客不存在')
        }
        let ret=await Like.findOne({where:{...cxt.request.body,user_id:cxt.state.user.id}})
        if(ret){
            cxt.throw(409,'您已经赞过了')
        }
        
        let num=blog.get('likes_count')
        console.log('num',num)
        blog.set('likes_count',num+1)
        await blog.save()
        cxt.body=blog;
    }
}


module.exports=new LikesController()