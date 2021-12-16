const { Schema, model } = require("mongoose");
const { hash, genSalt, compare } = require("bcrypt");

const usuarioSchema = new Schema({
    login: { 
                type: String, 
                unique: true, 
                required: [true, 'El nombre de usuario es obligatorio'], 
                max: [20,'Nombre de usuario excede la longitud permitida.'] 
            },
    contrasena: { 
                    type: String, 
                    required: [true, 'La contrasena es obligatoria.'] 
                },
    rol: { 
            type: String, 
            required: [true, 'El rol es obligatorio.'] 
        }
},
{ collection: "Usuarios" });

usuarioSchema.pre('save', async function (next) {
    console.log("encriptando contrasena...");
    console.log(this.contrasena);
    console.log(process.env.BCRYPT_ROUNDS);
    const salt = await genSalt(10);
    this.contrasena = await hash(this.contrasena, salt);

    next();
});

usuarioSchema.methods.comparePassword = async function (textoPassword) {
    console.log("Comparando password..." + textoPassword + ' con ' + this.contrasena);
    return await compare(textoPassword, this.contrasena);
};

exports.Usuario = model('Usuario', usuarioSchema);