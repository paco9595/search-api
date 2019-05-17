import express from 'express'
import { allVacantes, getVacante, applyVacante } from './../controllers'
const VacanteRutas = express.Router();

VacanteRutas.get('/', allVacantes)
VacanteRutas.get('/:id', getVacante)
VacanteRutas.get('/apply/:id_vacante/:id_usuario', applyVacante)
// VacanteRutas.post('/', createUser)

export default VacanteRutas