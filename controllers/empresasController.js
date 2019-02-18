import { Tag, Empresa } from './../models'
import bcrypt from 'bcrypt-nodejs'
import { connection } from './../services/mysqlService'
// import { connection } from './../services'

const empresas = [{
    id: 0,
    nombre: 'Accenture',
    tel: '123456789',
    descripcion: 'jksdfkjskfdjfiuguhfkjs;ofijklfnsksmnsdf',
    tags: [{
        id: 0,
        color: 'yellow',
        nombre: 'electricidad'
    },
    {
        id: 1,
        color: 'blue',
        nombre: 'plomero'
    }]
},
{
    id: 1,
    nombre: 'Accenture',
    tel: '123456789',
    descripcion: 'jksdfkjskfdjfiuguhfkjs;ofijklfnsksmnsdf',
    tags: [{
        id: 0,
        color: 'yellow',
        nombre: 'electricidad'
    },
    {
        id: 1,
        color: 'blue',
        nombre: 'plomeria'
    }]
}]
export const getEmpresasAll = (req, res) => {
    connection.query(`
        select empresa.nombre, tag.tag from empresatag 
            JOIN empresa on empresa.id_empresa = empresatag.id_empresa 
            JOIN tag on tag.id_tag = empresatag.id_tag
    `,(err,results,fields)=>{
        console.log(err)
        res.status(200).send(results)
    })
   // res.status(200).send(empresas)
}

export const getEmpresa = (req,res) =>{
    const { id } = req.params;
    const empresa = empresas.filter(item=> item.id == id)
    res.status(200).send(...empresa)
}

export const updateEmpresa = (req,res)=>{
    var { id, nombre, tel, descripcion, tags} = req.query;
    if (tags){
        try {
            var tags = JSON.parse(tags).map(item=> new Tag(item))
        } catch (error) {
            res.status(400).send({message: 'bad format array'})
            return
        }
    }
    const obj = {id,nombre,tel,descripcion, tags}
    var create = new Empresa(obj)
    res.status(200).send(create)
}