import express from 'express';
import bodyParser from 'body-parser';
import empresasRutas from './rutas/empresasRutas';
import userRutas from './rutas/userRutas'
import VacanteRutas from './rutas/vacantesRutas'
import cors from 'cors'

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/empresas', empresasRutas)
app.use('/user', userRutas)
app.use('/vacante', VacanteRutas)
export default app;


