const message = {}; 

message.generalMessage = (res,statusCode,ok,data,message)=>{
    res.status(statusCode).json({
        ok,data,message
    })

}

export default message;