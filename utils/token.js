const jwt=require('jsonwebtoken')

module.exports={
    encrypt(data,secret,expire='1h'){
        return jwt.sign(data,secret,{expiresIn:expire})
    },
    decrypt(token,secret){
        try{
            let data=jwt.verify(token,secret)
            return data
        }catch(err){
            return false
        }
    }
}