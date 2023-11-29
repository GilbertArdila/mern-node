import express  from "express";
import morgan from "morgan";
import cors from "cors";
import DBConnection from "./database.js";
import userRoute from "./routes/user.routes.js";
import employeeRoute from "./routes/employee.routes.js";
import config from "./config/config.js";


DBConnection();

const app = express();
app.set("port",config.port);
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({origin:"*"}));

app.use('/users',userRoute)
app.use('/employees',employeeRoute)


app.listen(app.get("port"),()=>{
    console.log(`server running on port: ${app.get("port")}`)
})