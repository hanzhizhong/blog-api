const {
    Blog,
    User
} = require('../db/mysql/models');

class BlogsController {
    async list(cxt) {
        let {
            pageSize = 5, pageIndex = 1
        } = cxt.query;

        let ret = await Blog.findAndCountAll({
            limit: pageSize * 1,
            offset: Math.max(0, (pageIndex - 1) * pageSize),
            include: [{
                model: User,
                as: "users",
                attributes: {
                    exclude: ['passwd']
                }
            }]
        })
        cxt.body = ret;
    }
    async create(cxt) {
        cxt.verifyParams({
            title: {
                type: "string",
                required: true
            },
            content: {
                type: "string"
            }
        })
        const {
            title,
            content
        } = cxt.request.body;
        let ret = await Blog.create({
            title,
            content,
            user_id: cxt.state.user.id
        })
        cxt.body = ret
    }
    async delOne(cxt) {
        let ret = await Blog.destroy({
            where: {
                id
            }
        })
        cxt.status = 204;
    }
    async updateOne(cxt) {
        //先检查博客是否存在
        cxt.verifyParams({
            title: {
                type: "string",
                required: true
            },
            content: {
                type: "string"
            }
        })
        let ret = await cxt.state.blog.update({
            ...cxt.request.body,
            user_id: cxt.state.user.id
        })
        cxt.body = ret;
    }
    //根据id获取用户下所有博客内容
    async listById(cxt) {
        let {
            id
        } = cxt.params;
        let {
            pageIndex = 1, pageSize = 5
        } = cxt.query;
        cxt.body = await Blog.findAndCountAll({
            limit:Number(pageSize),
            offset:Math.max(0,(pageIndex-1)*pageSize),
            where: {
                user_id:Number(id)
            },
            include: [{
                model: User,
                as: "users",
                attributes: {
                    exclude: ['passwd']
                }
            }]
        })
    }
    //判断博客是否存在
    async checkBlogIsExist(cxt, next) {
        let {
            id
        } = cxt.params;
        let blog = await Blog.findByPk(Number(id))
        if (!blog) {
            cxt.throw(404, '当前的博客内容不存在')
        }
        cxt.state.blog = blog;
        await next()
    }
    //检查权限问题，当前的登录用户时否可是删除非本人的博客
    async checkUser(cxt, next) {
        let {
            blog,
            user
        } = cxt.state;
        if (blog.user_id !== user.id) {
            cxt.throw(401, '当前用户没有此操作权限')
        }
        await next()
    }
}

module.exports = new BlogsController()