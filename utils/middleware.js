const {decrypt} =require('./token')
const {secret}=require('../config/conf')
module.exports=async (cxt,next)=>{
    let token=cxt.header.authorization||''
    token=token.replace('Bearer','').trim()
    let ret=decrypt(token,secret)
    if(!ret){
        cxt.throw(401,'非法的token')
    }
    cxt.state.user=ret
    await next()
}