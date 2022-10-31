//Mongo DB Atlas (configuración y conexión)
const dotenv = require("dotenv")
dotenv.config();

const mongoose = require("mongoose");
const URI = process.env.DB_URI

mongoose.connect(URI, (err) =>{
    err? console.log("Tenés un error de conexión") : console.log("Mongo Atlas Connected");
})