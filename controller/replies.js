const {Reply}=require('../db/mysql/models')

class ReplyController{
    async list(cxt){
        cxt.body=await Reply.findAll({where:{...cxt.query}})
    }
}

module.exports=new ReplyController()