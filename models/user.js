import { attributes } from 'structure'
export const User = attributes({
    id: Number,
    nombre: String,
    tel: String,
    email: String,
    roll: String
})(class User { })