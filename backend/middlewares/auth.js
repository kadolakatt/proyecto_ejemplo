const  { verify } = require('jsonwebtoken');

exports.authGuard = (request, _response, next) => {

    const authorization = request.headers.authorization;

    if (!authorization) {
        _response.status(401).send('No se encuentra autenticado');
    }else {
        try {
            console.log("Verificando validez de la petición: " + authorization);
            const token = authorization.split(' ')[1];
            const payload = verify(token, process.env.JWT_ACCESS_SECRET);
            request.jwt_data = payload;
            return next();
        } catch (e) {
            console.log(e);
            if (e.name) {
                if (e.name == "TokenExpiredError") {
                    _response.status(410).send('No se encuentra autenticado');
                }else {
                    _response.status(401).send('No se encuentra autenticado');
                }

            }
            
        }
    }
        

   
    
  
};