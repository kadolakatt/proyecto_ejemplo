require('dotenv').config();

const mongoose = require('mongoose');

const connectToMongoDB_v2 = async () => {
    try {
        console.log('Conectandose a MongoDB a través de Mongoose...');
        await mongoose.connect(process.env.MONGODB_URI); 
        console.log('Conectado a MongoDB a través de Mongoose.');
    }catch (e) {
        console.log('Ocurrió un error al intentar conectarse a MongoDB: ');
        console.log(e);
    }
}

const closeMongoDB_v2 = async() => {
    
    if (mongoose.connection) {
        try {
            console.log("Cerrando conexión...");
            mongoose.connection.close();
            console.log("Conexión cerrada.");
        }catch (e) {
            console.log("Ocurrió un error cerrando la conexión: ");
            console.log(e);
        }
        
    }
    
}

const connectionWatchers_v2 = () => {
    process.on('exit', closeMongoDB_v2);
    process.on('SIGINT', closeMongoDB_v2);
    process.on('SIGTERM', closeMongoDB_v2);
    process.on('SIGKILL', closeMongoDB_v2);
    process.on('uncaughtException', closeMongoDB_v2);
}

exports.connectToMongoDB_v2 = connectToMongoDB_v2;
exports.closeMongoDB_v2 = closeMongoDB_v2;
exports.connectionWatchers_v2 = connectionWatchers_v2;