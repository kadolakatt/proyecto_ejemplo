require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const { setUpControllers } = require("./controllers");
const { connectToMongoDB_v2, connectionWatchers_v2 } = require("./db/dbMongoose");


const app = express();
const port = process.env.PORT || 9000;

//Configuramos middleware de express para procesar cuerpos de peticiones
//en formato json 
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());

//Establecemos conexión con mongo
connectToMongoDB_v2();

//Configuramos los controladores
setUpControllers(app);

//Configuramos los watchers que cerrarán la conexión a Mongo
//cuando se detenga el backend
connectionWatchers_v2();

app.listen(port, () => {
    console.log(`Backend corriendo en puerto ${port}`);
});