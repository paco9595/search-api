import { attributes } from 'structure'
export const User = attributes({
    id: Number,
    userName: String,
    password: String,
    nombre: String,
    apellido: String,
    roll: String,
    image: String,
    correo: String
})(class User {})