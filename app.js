import express from 'express';
import bodyParser from 'body-parser';
import empresasRutas from './rutas/empresasRutas';
import cors from 'cors'

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/empresas', empresasRutas)

export default app;


