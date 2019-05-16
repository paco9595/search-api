import jwt from 'jwt-simple'

const secret = 'Clavesecreta'

export const userAuth = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).send({ msg: "no tienes autorizacion" })
        }
        var token = req.headers.authorization.replace(/['"]+/g, '');
        var payload = jwt.decode(token, secret)
        console.log(payload)
        // User.findById(payload._id, err =>{
        //     if(err) return res.status(500).send({msg:"error validando el token"})
        // })
    } catch (ex) {
        if (ex.message === "Token expired") return res.status(401).send({ msg: "token expirado" })
        return res.status(403).send({ msg: "Token no vaildo" })
    }
    req.user = payload;
    next();
}