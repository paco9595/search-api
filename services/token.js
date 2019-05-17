import jwt from 'jwt-simple'
import moment from 'moment'
var secret = "Clavesecreta"
export const creatToken = function (user) {
  var payload = {
    _id: user.id_usuario,
    nombre: user.nombre,
    edad: user.edad,
    email: user.email,
    rol: user.rol,
    iat: moment().unix(),
    exp: moment().add(1, "d").unix()
  }
  return jwt.encode(payload, secret);
}