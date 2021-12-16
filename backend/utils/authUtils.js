const { sign } = require('jsonwebtoken');
const { Usuario } = require('../models/Usuario');

const getTokenPair = async (user) => {
    const accessToken = await sign(
      {
        user: { _id: user._id, rol: user.rol, user: user.login },
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '60m' }
    );
  
    const refreshToken = await sign(
      { user: { _id: user._id, user: user.login } },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );
  
    return { refreshToken, accessToken };
  };
  
const validarUsuario = async (payload) => {
    const user = await Usuario.findOne({ login: payload.username });
    if (!user) throw new Error("Usuario o contraseña no valido.");
    console.log('Validando login: ' +  payload.password);
    console.log(user);
    const passwordMatch = await user.comparePassword(payload.password);
    if (!passwordMatch) throw new Error("Usuario o contraseña no valido.");;

    return await getTokenPair(user);
}

exports.validarUsuario = validarUsuario;
exports.getTokenPair = getTokenPair;