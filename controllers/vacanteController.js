import { connection } from './../services/db'

export const allVacantes = (req, res) => {
  connection.query(`SELECT
    vacante.id_vacante,
    vacante.Nombre_puesto,
    vacante.Fecha,
    vacante.id_empresa,
    area.nombre_area,
    empresa.nombre,
    empresa.rating
    FROM vacante
    JOIN area ON area.id_area=vacante.id_area 
    JOIN	empresa ON empresa.id_empresa=vacante.id_empresa
  `, (err, results) => {
      if (err) {
        return res.status(500).send({ vacantes: 'todas las vacantes' })
      }
      res.status(200).send({ vacantes: results })
    })
}
export const getVacante = (req, res) => {
  const { id } = req.params
  connection.query(`SELECT * FROM vacante where id_vacante=${id}`, (err, results) => {
    if (err) {
      return res.status(500).send({ err, vacantes: 'todas las vacantes' })
    }
    res.status(200).send({ vacante: results[0] })
  })
}
export const createVacante = (req, res) => {
  const {
    nombre_puesto,
    fecha,
    id_empresa,
    id_area
  } = req.body
  res.status(200).send({ user, pass })
}
export const applyVacante = (req, res) => {
  console.log('lel')
  const { id_vacante, id_usuario } = req.params
  res.status(200).send({ id_vacante, id_usuario })
}