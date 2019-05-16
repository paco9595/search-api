import express from 'express'
import { allVacantes, getVacante } from './../controllers'
const VacanteRutas = express.Router();

VacanteRutas.get('/', allVacantes)
VacanteRutas.get('/:id', getVacante)
// VacanteRutas.post('/', createUser)

export default VacanteRutas