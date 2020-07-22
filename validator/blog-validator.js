const validator=require('validator') 
const {ErrorInfoModel}=require('../utils/answer')
/* class BaseValid{
    constructor({})
} */
class BlogValid{
    detail(res,id){
        if(!id){
            res.json(new ErrorInfoModel('当前参数名不正确',20001))
            return 
        }
        if(!validator.isInt(id)){
            res.json(new ErrorInfoModel('id必须是整型数据',20000))
            return 
        }
    }
    add(res,args){
        let {title}=args;
        if(!title){
            res.json(new ErrorInfoModel('当前参数名不正确',20001))
            return 
        }
        if(validator.isEmpty(title)){
            res.json(new ErrorInfoModel('文章标题不能为空',20000))
            return 
        }
    }
    update(res,args){
        let {id,title}=args;
        if(!title||!id){
            res.json(new ErrorInfoModel('当前参数名不正确',20001))
            return 
        }
        if(!validator.isInt(id)){
            res.json(new ErrorInfoModel('id值必须为整数类型'),20000)
            return
        }
        if(validator.isEmpty(title)){
            res.json(new ErrorInfoModel('文章标题不能为空',20000))
            return 
        }
    }
}

module.exports=new BlogValid()