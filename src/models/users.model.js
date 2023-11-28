import mongoose from "mongoose";
const { Schema, model} = mongoose;

const userSchema = new Schema(
    {
    name:{
        type:String,
        require:true
    },
    email:{
        type: String,
        require:true,
        unique:true
    },
    password:{
        type: String,
        require:true
    },
},
 {
    timestamps: true
 }
);

const User = model('user',userSchema);
export default User;