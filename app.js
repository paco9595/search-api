import express from 'express';
import bodyParser from 'body-parser';
import empresasRutas from './rutas/empresasRutas';
import userRutas from './rutas/userRutas'
import VacanteRutas from './rutas/vacantesRutas'
import areaRutas from './rutas/areaRutas'
import cors from 'cors'

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/empresas', empresasRutas)
app.use('/user', userRutas)
app.use('/vacante', VacanteRutas)
app.use('/area', areaRutas)
export default app;


