import bcrypt from 'bcrypt-nodejs'
import { User } from './../models'
import { connection } from './../services/mysqlService'
export function create(req,res){
    var { userName, password, nombre, apellido, correo } = req.query;
    if( !userName || !password || !nombre || !apellido || !correo){
        console.log(userName,password,nombre,apellido)
        return res.status(400).send({msg:"datos insuficentes"})
    }
    const user = new User(req.query)
    user.rol = 'user';
    user.image = 'null';
    console.log(user)
    
    bcrypt.hash(password,null,null,(err,hash)=>{
        if(err || !hash){
            return res.status(500).send({msg:"error al momento de encriptar contrase;a"})
        }
        user.password = hash
        console.log(hash)
        connection.query(`SELECT * FROM usuario WHERE correo='${correo }'`, function (error, results, fields) {
            if (error) {
                console.log(error)
                return res.status(500).send({msg:"internal error"})};
            
            if (results.length >0) return res.status(400).send({msg:"ese Correo ya fue utilizado"})
            connection.query(
                `INSERT INTO usuario(userName,password,roll,nombre,apellido,img,correo) VALUES ('${userName}','${user.password}','${user.rol}','${nombre}','${apellido}','${user.image}','${correo}')`,
                function (error,results,fields) {
                    if (error) return res.status(500).send({msg:"internal error saving",error});
                    console.log('save')
                    return res.status(200).send({msg:"usuario Guardado"})
                }
            )
        });
    })
    
}