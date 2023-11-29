import mongoose from "mongoose";
import config from "./config/config.js";


const URI = config.uri;

const DBConnection = async () =>{
    try {
        mongoose.set('strictQuery',true);
       const db = await mongoose.connect(URI); 
       console.log( `Data Base running: ${db.connection.name}`);
    } catch (error) {
        console.log(`Error al conectar ${error}`)
    }
}

export default DBConnection;