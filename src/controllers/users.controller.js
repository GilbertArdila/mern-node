import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import message from "../utilities/message.js";
import config from "../config/config.js";


const userCtrl = {};

userCtrl.register = async (req, res) =>{
   
    try {
        const data = req.body;
        const exist = await User.findOne({email:data.email});
        if(exist){
           
            return message.generalMessage(res,400,false,null,"email already exist");
        }
        data.password = await bcrypt.hash(data.password, 10);
       
        const newUser = await User.create(data);
        const token = jwt.sign({_id: newUser._id},config.secret,{expiresIn:"1h"});
       
        
        
        return message.generalMessage(res,201,true,{...newUser._doc,password:null,token},"User created");
    } catch (error) {
        message.generalMessage(res,500,false,null,error.message)
    }
}

userCtrl.login = async (req, res) =>{
   
    try {
        const data = req.body;
        const exist = await User.findOne({email:data.email});
       
        if(!exist){
            return message.generalMessage(res,401,false,null,"email or password wrong")
        }
        const match = await bcrypt.compare(data.password, exist.password);
        if(match){
            const token =  jwt.sign({_id:exist._id},config.secret,{expiresIn:"1h"});
            /**este ._doc se le pone por disposiciones de mongo */
            return message.generalMessage(res,201,true,{...exist._doc,password:null,token},"Welcome")
            
        }
        return message.generalMessage(res,401,false,null,"email or password wrong") 
        
        
    } catch (error) {
        message.generalMessage(res,500,false,null,error.message)
        
    }
}

export default userCtrl