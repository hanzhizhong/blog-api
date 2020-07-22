const mysql=require('mysql')
const {db}=require('../conf/config')

let connection=mysql.createConnection(db);

connection.connect((err)=>{
    if(err){
        console.error('mysql数据库连接失败')
        return
    }
    console.log('数据库连接成功')
})

function exec(sql){
    return new Promise((resolve,reject)=>{
        connection.query(sql,(err,ret)=>{
            if(err){
                reject(err);
                return 
            }
            resolve(ret)
        })
    })
}

module.exports={
    exec
};