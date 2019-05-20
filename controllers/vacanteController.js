import { connection } from './../services/db'

export const allVacantes = (req, res) => {
  connection.query(`SELECT
    vacante.id_vacante,
    vacante.Nombre_puesto,
    vacante.Fecha,
    vacante.id_empresa,
    area.nombre_area,
    empresa.nombre,
    empresa.rating,
    empresa.descripcion,
    empresa.logo
    FROM vacante
    JOIN area ON area.id_area=vacante.id_area 
    JOIN	empresa ON empresa.id_empresa=vacante.id_empresa
  `, (err, results) => {
      if (err) {
        return res.status(500).send({ err, vacantes: 'error todas las vacantes' })
      }
      res.status(200).send({ vacantes: results })
    })
}
export const getVacante = (req, res) => {
  const { id, user } = req.params
  connection.query(`
  SELECT
  vacante.Nombre_puesto,
  vacante.id_vacante,
  vacante.Fecha,
  vacante.descripcion,
  vacante.skills,
  empresa.nombre,
  empresa.telefono,
  empresa.direccion,
  empresa.descripcion,
  empresa.logo,
  empresa.rating,
  relacion.id_usuario,
  area.nombre_area,
  case when relacion.id_usuario = ${user}
  then 'true'
  else 'false'
 END apply
  FROM relacion_vacante_usuario AS relacion
  LEFT JOIN vacante ON relacion.id_vacante=vacante.id_vacante
  JOIN empresa ON empresa.id_empresa=vacante.id_empresa
  JOIN area ON area.id_area= vacante.id_area
  WHERE vacante.id_vacante=${id}
  `, (err, results) => {
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
    id_area,
    descripcion
  } = req.body
  connection.query(`INSERT INTO vacante (Nombre_puesto,fecha,id_empresa,id_area,descripcion) VALUES ('${nombre_puesto}','${fecha}','${id_empresa}','${id_area}','${descripcion}')`, (err, results) => {
    if (err) {
      return res.status(500).send({ err, vacantes: 'todas las vacantes' })
    }
    return res.status(200).send({ results })
  })

}
export const applyVacante = (req, res) => {
  const { id_vacante, id_usuario } = req.params
  const id_estado = 1
  if (!id_vacante || !id_usuario) return res.status(400).send({ status: 400, statusMessage: 'bad request', body: req.body })
  connection.query(`
    INSERT INTO relacion_vacante_usuario 
    (id_vacante, id_estado, id_usuario)
    value ('${id_vacante}','${id_estado}','${id_usuario}')`, (err, results) => {
      if (err) {
        return res.status(500).send({ status: 500, err, statusMessage: 'intenarl error' })
      }
      res.status(200).send({ id_vacante, id_usuario })
    })
}
export const getVacantesPerUser = (req, res) => {
  const { id } = req.params
  connection.query(`
    SELECT 
    estado.estado,
    estado.color,
    vacante.Nombre_puesto,
    vacante.Fecha,
    area.nombre_area,
    relacion.id_usuario,
    relacion.id_Relacion,
    relacion.id_vacante,
    empresa.nombre,
    empresa.logo,
    empresa.rating
    FROM relacion_vacante_usuario AS relacion 
    JOIN estado ON estado.id_estado = relacion.id_estado
    JOIN vacante ON vacante.id_vacante = relacion.id_vacante
    JOIN area ON area.id_area = vacante.id_area
    JOIN empresa ON empresa.id_empresa = vacante.id_empresa
    WHERE relacion.id_usuario ='${id}'
    `, (err, vacantes) => {
      if (err) {
        return res.status(500).send({ err, vacantes: 'lel' })
      }
      return res.status(200).send({ status: 200, vacantes })
    })

}
export const updateStatusVacante = (req, res) => {
  const { id_relacion, id_estado } = req.params
  connection.query(
    `UPDATE relacion_vacante_usuario
    SET id_estado=${id_estado} 
    WHERE id_Relacion=${id_relacion}`,
    (err, vacantes) => {
      if (err) {
        return res.status(500).send({ err, vacantes: 'lel' })
      }
      return res.status(200).send({ status: 200, vacantes })
    }
  )
}
export const deleteVacante = (req, res) => {
  const { id_relacion } = req.params

}
