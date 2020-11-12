const jwt = require('jsonwebtoken');
//======================
//    Verifica Token
//======================
let verificaToken = (req, res, next) => {
    let token = req.get('token'); //Nombre del header
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                error: {
                    message: "Token Inválido",
                    err
                }
            })
        }
        req.usuario = decoded.usuario;
        next()
    })
}

//======================
//  Verifica Admin Role
//======================
let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next()
    } else {
        return res.status(401).json({
            ok: false,
            message: 'Área solo para admins'
        })
    }

}

//======================
//      Exports
//======================
module.exports = {
    verificaToken,
    verificaAdmin_Role
}