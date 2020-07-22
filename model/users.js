const {exec}=require('../db/mysql')
async function getAllUsersInfo(){
    let sql=`select username,nickname,gender,birthday from users`
    try{
        return await exec(sql)
    }catch(err){
        return `服务端未知错误`
    }
    
}
//增加一条用户
async function insertOne(args){
    if(Object.keys(args).length>0){
        let {username,nickname,gender,birthday,passwd}=args;
        let sql=`insert into users(username,nickname,gender,birthday,passwd) values('${username}','${nickname}',${gender},'${birthday}','${passwd}')`
        try{
            return await exec(sql)
        }catch(err){
            return `服务端未知错误`
        }
    }
}

//删除一条信息
async function deleteOne(id){
    let sql=`delete from users where id=${id}`
    try{
        return await exec(sql)
    }catch(err){
        return `服务端未知错误`
    }
}
//删除所有
async function deleteAll(){
    let sql='delete from users'
    try{
        return await exec(sql)
    }catch(err){
        return `服务端未知错误`
    }
}

//查询用户
async function selectOne(args){
    let sql='';
    if(args.id){
        let {id}=args;
        sql=`select username,nickname,gender,birthday from users where id='${id}'`
    }else{
        let {username,passwd}=args;
        sql=`select username,nickname,gender,birthday from users where username='${username}' and passwd='${passwd}'`
    }
    
    try{
        return await exec(sql)
    }catch(err){
        return `服务端未知错误`
    }
}

//编辑用户信息
async function updateOne(args){
    let {id,username,passwd,nickname,birthday,gender}=args;
    let sql=`update users set username='${username}',passwd='${passwd}',nickname='${nickname}',birthday='${birthday}',gender='${gender}' where id='${id}'`;
    try{
        return await exec(sql)
    }catch(err){
        return `服务端未知错误`
    }
}
//是否存在用户
async function isExistOne(args){
    let {username}=args;
    let sql=`select username from users where username='${username}'`
    try{
        return await exec(sql)
    }catch(err){
        return `服务端未知错误`
    }
}
module.exports={
    getAllUsersInfo,
    insertOne,
    updateOne,
    deleteAll,
    deleteOne,
    selectOne,
    isExistOne
};