import  { attributes } from 'structure'

export const Tag = attributes({
  id: Number,
  color: String,
  nombre: String
})(class Tag {})