const {exec}=require('../db/mysql')

async function getAllBlogList(){
    let sql=`select blogs.id,blogs.title,blogs.pub_time,users.username,users.nickname from blogs left join users on blogs.auth_id=users.id`
    
    try{
        let ret=await exec(sql)
        return ret
    }catch(err){
        return '服务器异常'
    }
    
}

async function getCurrentUserBlog(user){
    let sql=`select blogs.id,blogs.title,blogs.pub_time,users.username,users.nickname from blogs inner join users on blogs.auth_id=users.id where users.username='${user}'`
    try{
        let ret=await exec(sql)
        return ret 
    }catch(err){
        return '服务器异常'
    }
}

async function getDetailContentById(id){
    let sql=`select blogs.* from blogs where id='${id}'`;
    try{
        let ret=await exec(sql);
        return ret;
    }catch(err){
        return '服务器异常'
    }

}
async function addNewBlog(args){
    let {username,title,content}=args;
    let auth_id=await findOneByUsername(username)
    if(typeof auth_id==='string') return auth_id;
    try{
        
        let sql=`insert into blogs(title,content,auth_id) values('${title}','${content}','${auth_id}')`
        let ret=await exec(sql);
        return ret;
    }catch(err){
        return '服务器异常'
    }
}

async function findOneByUsername(name){
    try{
        let sql=`select users.id from users where username='${name}'`;
        let ret=await exec(sql)
        if(typeof ret==='string'){
            return '服务器异常'
        }
        let auth_id=null;
        if(ret.length>0){
            return auth_id=ret[0].id;
        }else{
            return '当前用户不存在'
        }
    }catch(err){
        return '服务器异常'
    }
}

async function updateBlogById(args){
    let {id,username,title,content}=args;
    let auth_id=await findOneByUsername(username)
    if(typeof auth_id==='string') return auth_id;
    let sql=`update blogs set title='${title}',content='${content}',auth_id='${auth_id}',pub_time='${Date.now()}' where id='${id}'`
    try{
        let ret=await exec(sql);
        return ret;
    }catch(err){
        return '服务器异常'
    }
}

async function removeBlogById(id){
    let sql=`delete from blogs where id='${id}'`
    try{
        let ret=await exec(sql)
        return ret;
    }catch(err){
        return '服务器异常'
    }
}

module.exports={
    getAllBlogList,
    getCurrentUserBlog,
    getDetailContentById,
    addNewBlog,
    updateBlogById,removeBlogById
}