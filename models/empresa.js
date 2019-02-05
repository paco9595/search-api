import { attributes } from 'structure'
import { Tag } from './tag'
export const Empresa = attributes({
    id: Number,
    nombre: String,
    tel: String,
    descripcion: String,
    tags: Array
})(class Empresa {})