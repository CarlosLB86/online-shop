const jwt = require('jsonwebtoken');
const User = require('../src/routes/api.routes')

exports.checkToken = async (req, res, next) => {
    // Comprobar si el token viene incluido en la cabecera Authorization
    if (!req.headers['authorization']) { // si no viene nada en la cabecera error
        return res.status(403).json({ message: 'Es necesario incluir el token de autorización' });
    }

    const token = req.headers['authorization'];

    // Comprobar si el token es correcto
    // TODO: Mover la clave al fichero de entorno
    let data;
    try {
        data = jwt.verify(token, 'friskel');
    } catch (error) {
        return res.status(403).json({ message: 'El token de autenticación es incorrecto' });
    }

    // Recupero el usuario
    const user = await User.findById(data.usuario_id).populate('cart');

    // El usuario no existe
    if (!usuario) {
        return res.status(403).json({ message: 'El usuario no existe' });
    }

    // Colocamos el usuario dentro de la petición
    req.user = user;

    next();
}