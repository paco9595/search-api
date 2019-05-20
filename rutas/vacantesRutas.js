import express from 'express'
import {
  allVacantes,
  getVacante,
  applyVacante,
  getVacantesPerUser,
  createVacante,
  updateStatusVacante,
  empresaVacante
} from './../controllers'
const VacanteRutas = express.Router();

VacanteRutas.get('/', allVacantes)
VacanteRutas.get('/info/:id/:user', getVacante)
VacanteRutas.put('/apply/:id_vacante/:id_usuario', applyVacante)
VacanteRutas.get('/user/:id', getVacantesPerUser)
VacanteRutas.post('/', createVacante)
VacanteRutas.put('/status/:id_relacion/:id_estado', updateStatusVacante)
VacanteRutas.get('/empresa/:id', empresaVacante)

export default VacanteRutas