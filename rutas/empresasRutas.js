import express from 'express'
import { getEmpresasAll, getEmpresa, updateEmpresa } from './../controllers'
import { searchall } from './../controllers/searchController'
const empresasRutas = express.Router();


empresasRutas.get('/', getEmpresasAll)
empresasRutas.get('/:id?', getEmpresa)
empresasRutas.get('/search/:word?', searchall)
empresasRutas.put('/', updateEmpresa)

export default empresasRutas