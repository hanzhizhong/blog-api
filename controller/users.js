/* 
users控制器
*/
const md5=require('md5')
const {User,sequelize,Sequelize}=require('../db/mysql/models')
const {secret}=require('../config/conf')

const {encrypt}=require('../utils/token')

class UserController{
    async login(cxt){
        cxt.verifyParams({
            username:{type:"string",required:true},
            passwd:{type:"string",required:true}
        })
        cxt.request.body.passwd=md5(cxt.request.body.passwd)
        let ret=await User.findOne({where:cxt.request.body})
        if(ret){
            cxt.body={token:encrypt({username:ret.username,id:ret.id},secret)}
        }else{
            cxt.throw(404,'用户名或密码不正确')
        }
    }
    async register(cxt){
        cxt.verifyParams({
            username:{type:'string',required:true},
            passwd:{type:'string',required:true}
        })

        cxt.request.body.passwd=md5(cxt.request.body.passwd)
        let [user,result]=await User.findOrCreate({where:cxt.request.body})
        
        if(result){
            delete user.dataValues.passwd;
            cxt.body= user.dataValues;
            return 
        }
        cxt.throw(409,'用户已经存在')
    }
    async update(cxt){
        cxt.verifyParams({
            username:{type:'string',required:true},
            passwd:{type:'string',required:true}
        })
        cxt.request.body.passwd=md5(cxt.request.body.passwd)
        await User.update(cxt.request.body,{where:cxt.params})
        cxt.body=await User.findOne({attributes:{exclude:['passwd']},where:cxt.params})
    }
    async delOne(cxt){
        let ret=await User.destroy({where:cxt.params})
        if(ret){
            cxt.status=204;
        }else{
            cxt.throw(404,'用户不存在')
        }
    }
    async list(cxt){
        let {pageIndex=1,pageSize=5}=cxt.query;
        cxt.body=await User.findAndCountAll({
            limit:Number(pageSize),
            offset:Math.max(0,(pageIndex-1)*pageSize),
            attributes:{exclude:['passwd']}
        })
    }
    async listById(cxt){
        cxt.body=await User.findOne({where:cxt.params,attributes:{exclude:['passwd']}})
    }
}

module.exports=new UserController();