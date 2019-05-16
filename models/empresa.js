import { attributes } from 'structure'
export const Empresa = attributes({
    id: Number,
    nombre: String,
    tel: String,
    descripcion: String,
    tags: Array
})(class Empresa {})