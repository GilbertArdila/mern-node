import Employee from "../models/employees.model.js";
import User from "../models/users.model.js";
import message from "../utilities/message.js";
const employeeCtrl={};

employeeCtrl.listAllEmployees = async (req,res) =>{
    try {
        const response = await Employee.find().populate({path:"user",select:"-password"});
        return message.generalMessage(res,201,true,response,"List of all employees");

    } catch (error) {
        message.generalMessage(res,500,false,null,error.message);
    }
}

employeeCtrl.createEmployee = async (req,res) =>{
    try {
        const data = req.body;
        const response = await Employee.create({...data,user:req.userId});
        message.generalMessage(res,201,true,response,"Employee created successfully")
        
    } catch (error) {
        message.generalMessage(res,500,false,null,error.message);
    }
}
employeeCtrl.listById=async (req,res)=>{
    try {
        const {id} = req.params;
        const response = await Employee.findById(id);
        if(!response){
            return message.generalMessage(res,404,false,null,"Employee not found")
        }
        return message.generalMessage(res,200,true,response,"employee by id");
    } catch (error) {
        message.generalMessage(res,500,false,null,error.message);
    }
}

employeeCtrl.listByBoss = async (req,res) =>{
    try {
        
        const response = await Employee.find({user:req.userId});
        message.generalMessage(res,200,true,response,"Employees by boos")
    } catch (error) {
        message.generalMessage(res,500,false,null,error.message);
    }
}

employeeCtrl.delete=async (req,res)=>{
    try {
        const {id} = req.params;
        const response = await Employee.findById(id);
        if(!response){
            return message.generalMessage(res,404,false,null,"Employee not found")
        }
        await response.deleteOne();
        return message.generalMessage(res,200,true,null,"Employee deleted")
    } catch (error) {
        message.generalMessage(res,500,false,null,error.message);
    }
}

employeeCtrl.update=async (req,res)=>{
    try {
        const {id} = req.params;
        const response = await Employee.findById(id);
        if(!response){
            return message.generalMessage(res,404,false,null,"Employee not found")
        }
        const updatedData = await response.updateOne(req.body);
        return message.generalMessage(res,200,true,updatedData,"employee updated");
    } catch (error) {
        message.generalMessage(res,500,false,null,error.message);
    }
}

employeeCtrl.findByLastName = async (req,res) =>{
    try {
        const {lastName} = req.params;
        /**regex to get a letter coincidence not only the hole name */
        const response = await Employee.find({lastName:{$regex: ".*"+lastName+".*"}});
        if(response.length === 0){
           return message.generalMessage(res,404,false,null,"no coincidences found");
        }
        return message.generalMessage(res,400,true,response,"coincidences");
        }catch (error) {
        message.generalMessage(res,500,false,null,error.message);}
    }
    
    employeeCtrl.listAllUsers = async (req,res) =>{
        try {
            const response = await User.find();

            const modifiedResponse = response.map(user => {
                //creamos un objeto nuevo sin el password
                const { password, ...userWithoutPassword } = user.toObject(); // Convierte el documento a un objeto para manipulación
                return userWithoutPassword;
            });
            
            return message.generalMessage(res,201,true,modifiedResponse,"List of all users");
    
        } catch (error) {
            message.generalMessage(res,500,false,null,error.message);
        }
    }
    


export default employeeCtrl;