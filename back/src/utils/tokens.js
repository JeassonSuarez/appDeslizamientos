import jwt from 'jsonwebtoken';
import 'dotenv/config.js'

export const generarToken = (correo) => {
    //se pasa un id, un token de cifrado, y un tiempo de expiracion
    return jwt.sign({correo}, process.env.SECRET_KEY,{
        expiresIn: 60*60*24
    });
}

export const verificarToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return error.name
    }
}
