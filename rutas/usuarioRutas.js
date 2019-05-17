import express from 'express'
import { create } from './../controllers/usuarioController'
const empresasRutas = express.Router();


empresasRutas.post('/create', create)

export default empresasRutas