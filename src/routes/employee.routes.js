import { Router } from "express";
import employeeCtrl from "../controllers/employees.controller.js";
import { tokenVerify } from "../middlewares/Auth.js";

const route = Router();

route.get('/',employeeCtrl.listAllEmployees);

route.get('/id/:id',
tokenVerify,
employeeCtrl.listById);


route.get('/boss',
tokenVerify,
employeeCtrl.listByBoss);

route.get('/search/:lastName',
tokenVerify,
employeeCtrl.findByLastName);

route.post('/',
tokenVerify,
employeeCtrl.createEmployee);

route.delete('/delete/:id',
tokenVerify,
employeeCtrl.delete);

route.patch('/update/:id',
tokenVerify,
employeeCtrl.update);

export default route;