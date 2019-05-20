import { creatToken } from './../services/token'
import bcrypt from 'bcrypt-nodejs'
import { connection } from './../services/db'
export const login = (req, res) => {
  const { user, pass } = req.query
  if (!user || !pass) {
    return res.status(400).send({ statusMessage: "bad request" })
  }
  connection.query(`SELECT 
    id_usuario, nombre, pass, email, rol, edad, tel
    FROM usuario 
    WHERE usuario.email='${user}' AND usuario.pass='${pass}'`
    , (err, result) => {
      if (err) {
        return res.status(500).send({ err, statusMessage: "fatal error" })
      }
      if (!result.length) {
        return res.status(400).send({ statusMessage: "error al ingresar" })
      }
      console.log(result)
      const token = creatToken(result[0])
      return res.status(200).send({ user: "DONE", token, user: result[0] })
    })
}
export const createUser = (req, res) => {
  let { email, pass, nombre, edad, skill, tel, descripcion } = req.body
  if (!email || !pass || !nombre || !edad || !tel) {
    return res.status(400).send({ status: 400, statusMessage: 'bad request', body: req.body })
  }
  bcrypt.hash(pass, null, null, (e, hash) => {
    if (e || !hash) {
      return res.status(500).send({ status: 500, statusMessage: 'server error' })
    }
    req.body.cv = 'cv.pdf'
    req.body.img = 'img.png'
    connection.query(`SELECT * FROM usuario where 'email'='${email}'`, (error, results, fields) => {
      if (error) throw error
      if (results.length > 0) {
        return res.status(406).send({ status: 406, statusMessage: 'email ya utilizado' })
      } else {
        connection.query(`
        INSERT INTO usuario 
          (nombre,pass,email,descripcion,tel,edad,skills)
          VALUES ('${nombre}','${pass}','${email}','${descripcion}','${tel}','${edad}','${skill.toString()}')`,
          (err, result) => {
            if (err) {
              console.log(err)
              return res.status(500).send({ status: 500, statusMessage: 'intenarl error' })
            }
            console.log(result)
            connection.query(`SELECT 
              id_usuario, nombre, pass, email, rol, edad, tel
              FROM usuario 
              WHERE id_usuario = '${result.insertId}'`
              , (err, r) => {
                if (err) {
                  return res.status(500).send({ err, statusMessage: "fatal error" })
                }
                console.log(r)
                const token = creatToken(r[0])
                return res.status(200).send({ user: "DONE", token, user: r })
              })
          }
        )
      }
    });

  })

}

export const getUser = (req, res) => {

  connection.query(`SELECT * FROM usuario WHERE usuario.id_usuario='${req.params.id}'`,
    (err, user) => {
      console.log('lel')
      if (err) {
        res.status(500).send({ err, statusMessage: 'dead' })
      }
      if (user) {
        return res.status(200).send({ user: user[0] })
      }
    })
}