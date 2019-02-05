import express from 'express'
import { getEmpresasAll, getEmpresa, updateEmpresa } from './../controllers'
const empresasRutas = express.Router();


empresasRutas.get('/', getEmpresasAll)
empresasRutas.get('/:id?', getEmpresa)

empresasRutas.put('/', updateEmpresa)

export default empresasRutas