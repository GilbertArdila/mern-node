import { Router } from "express";
import employeeCtrl from "../controllers/employees.controller.js";

const route = Router();

route.get('/',employeeCtrl.listAllEmployees);
route.get('/id/:id',employeeCtrl.listById);
route.get('/boss/:id',employeeCtrl.listByBoss);
route.get('/search/:lastName',employeeCtrl.findByLastName);
route.post('/',employeeCtrl.createEmployee);
route.delete('/delete/:id',employeeCtrl.delete);
route.patch('/update/:id',employeeCtrl.update);

export default route;