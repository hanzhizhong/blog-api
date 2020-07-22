const {ErrorInfoModel}=require('../utils/answer')

function loginCheck(req,res,next){
    if(!req.session.username){
        res.json(new ErrorInfoModel('not login, please login first',10002))
        return 
    }
    next()
}

module.exports=loginCheck;