import { creatToken } from './../services/token'
import bcrypt from 'bcrypt-nodejs'
import { connection } from './../services/db'
export const login = (req, res) => {
  const { user, pass } = req.query

  const us = {
    id_usuario: 1,
    nombre: 'paco',
    edad: 23,
    email: "paco",
    rol: 'user',
  }
  const token = creatToken(us)

  res.status(200).send({ user, pass, token })
}
export const createUser = (req, res) => {
  let { email, pass, nombre, edad, skills, tel } = req.body
  if (!email || !pass || !nombre || !edad || !tel) {
    return res.status(400).send({ status: 400, statusMessage: 'bad request', body: req.body })
  }
  bcrypt.hash(pass, null, null, (e, hash) => {
    if (e || !hash) {
      return res.status(500).send({ status: 500, statusMessage: 'server error' })
    }
    pass = hash
    req.body.cv = 'cv.pdf'
    req.body.img = 'img.png'
    connection.query(`SELECT * FROM usuario where 'email'='${email}'`, (error, results, fields) => {
      if (error) throw error
      if (results.length > 0) {
        return res.status(406).send({ status: 406, statusMessage: 'email ya utilizado' })
      } else {
        console.log('email', email)
        connection.query(`
        INSERT INTO usuario 
          (nombre,pass,email,tel,edad,skills)
          VALUES ('${nombre}','${hash}','${email}','${tel}','${edad}','${skills}')`,
          (err, result) => {
            if (err) {
              console.log(err)
              return res.status(500).send({ status: 500, statusMessage: 'intenarl error' })
            }

            return res.status(200).send({ result })

          }
        )

      }
    });

  })

}
