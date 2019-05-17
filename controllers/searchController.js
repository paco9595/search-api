import { connection } from './../services'

export const searchall = (req, res) => {
    let resultados = []
    const { word } = req.params
    console.log(word)
    connection.query(`
        select nombre from empresa 
        where nombre LIKE '%${word}%'
    `, (err, results, fields) => {
            if (err) console.log(err)
            resultados = results.map(i => ({ nombre: i.nombre, type: 'empresa' }))
            connection.query(`
            select tag from tag 
            where tag LIKE '%${word}%'
        `, (err, results, fields) => {
                    if (err) console.log(err)
                    const rest = results.map(i => ({ nombre: i.tag, type: 'tag' }))
                    resultados = [...resultados, ...rest]
                    res.status(200).send(resultados)
                })

        })

}