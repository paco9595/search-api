import express from 'express'
import { login, createUser, getUser } from './../controllers'
import { userAuth } from './../middelware/authVaild'
const userRutas = express.Router();

userRutas.get('/', login)
userRutas.post('/', createUser)
userRutas.get('/:id', getUser)

// userRutas.put('/', updateEmpresa)

export default userRutas