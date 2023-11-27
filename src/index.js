import express  from "express";
import morgan from "morgan";
import cors from "cors";
import DBConnection from "./database.js";

DBConnection();

const app = express();
app.set("port",4000);
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({origin:"*"}));


app.listen(app.get("port"),()=>{
    console.log(`server running on port: ${app.get("port")}`)
})