import mongoose from "mongoose";
const { Schema, model} = mongoose;

const employeeSchema = new Schema(
    {
    firstName:{
        type:String,
        require:true
    },
   middleName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    motherLastName:{
        type:String,
        require:true
    },
    id:{
        type:String,
        require:true
    },
    contractType:{
        type:String,
        require:true
    },
    user:{
        type:Schema.ObjectId,
        ref:"user"
    },
   
},
 {
    timestamps: true
 }
);

const Employee = model('employee',employeeSchema);
export default Employee;