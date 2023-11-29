import { Router } from "express";
import userCtrl from "../controllers/users.controller.js";
import employeeCtrl from "../controllers/employees.controller.js";
import { tokenVerify } from "../middlewares/Auth.js";


const route = Router();
route.get('/list',
tokenVerify,
employeeCtrl.listAllUsers);

route.post('/register',userCtrl.register);
route.post('/login',userCtrl.login);


export default route;