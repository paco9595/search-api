import express from 'express'
import { getAreasCount } from './../controllers'
const areaRutas = express.Router();

areaRutas.get('/', getAreasCount)

export default areaRutas