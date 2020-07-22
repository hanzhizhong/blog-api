class BaseInfoModel{
    constructor(args){
        if(typeof args==='string'){
            this.msg=args;
            return 
        }
        this.data=args
    }
}

//返回错误信息
class ErrorInfoModel extends BaseInfoModel{
    constructor(args,error,status=400){
        super(args)
        this.error=error;
        this.status=status;
    }
}

//返回正确的信息
class SuccessInfoModel extends BaseInfoModel{
    constructor(args,error=0,status=200){
        super(args)
        this.error=error
        this.status=status;
    }
}

module.exports={
    SuccessInfoModel,
    ErrorInfoModel
}

/* 

使用的时候

new SuccessInfoModel(data,error=0,status=200)
new ErrorInfoModel(msg:'',error=自定义,status=400)


*/