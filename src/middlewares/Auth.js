import User from "../models/users.model.js";
import  Jwt  from "jsonwebtoken";
import message from "../utilities/message.js";
import config from "../config/config.js";


export const tokenVerify = (req, res,next)=> {
    if(!req.headers.authorization){
        return message.generalMessage(res,401,false,null,"Unauthorized");
    }

    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return message.generalMessage(res,401,false,null,"no token")
    }
    Jwt.verify(token,config.secret,async(error, payload)=>{
        
        if(error){
            return message.generalMessage(res,401,false,null,"token invalid")
        }
        /**cuando se firma el token se incluye el _id en él */
        const {_id} = payload;
        const response = await User.findById(_id);
        if(!response){
            return message.generalMessage(res,401,false,null,"user not found")
        }
        req.userId = _id;
        next();
    });
}
