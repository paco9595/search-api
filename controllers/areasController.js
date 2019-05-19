import { connection } from "./../services";
export const getAreasCount = (req, res) => {
  connection.query(`
  SELECT 
	area.*,
  COUNT(*) AS cantidad
  FROM area
  LEFT JOIN vacante ON area.id_area = vacante.id_area
  GROUP BY area.nombre_area
  `, (err, results) => {
      if (err) {
        return res.status(500).send({ err, status: 500 })
      }
      return res.status(200).send({ results })
    })
}