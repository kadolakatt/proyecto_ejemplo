const express = require('express');
const { Usuario } = require('../models/Usuario');
const { validarUsuario } = require('../utils/authUtils'); 
const { authGuard } = require('../middlewares/auth');
const router = express.Router();

router.post('/new', authGuard ,async (request, response) => {
    console.log("Usuario nuevo...");
    const usr = new Usuario(request.body);
    await usr.save();
    response.send({ login: usr.login, _id: usr._id });
});

//{ username: xxxxxxx, password: xxxxxxxx }
router.post('/login', async (request, response) => {
    try {
        const { refreshToken, accessToken } = await validarUsuario(request.body);
        //Simplificamos el inicio de sesión, no usamos el refreshToken
        response.json({ token: accessToken });
        
    }catch(e) {
        console.log("Error al intentar autenticar usuario.");
        console.log(e);
        response.status(500).send('Nombre de usuario o contraseña no valido.');
    }
});

module.exports = router;