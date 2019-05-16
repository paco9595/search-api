import express from 'express'
import { login, createUser } from './../controllers'
const userRutas = express.Router();

userRutas.get('/', login)
userRutas.post('/', createUser)

// userRutas.put('/', updateEmpresa)

export default userRutas