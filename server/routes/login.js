const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioDb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: err
            });
        }
        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                contenido: 'El usuario ha fallado',
                message: err
            });
        }
        if (!bcrypt.compareSync(body.pass, usuarioDb.pass)) {
            return res.status(400).json({
                ok: false,
                contenido: 'Contraseña Incorrecta',
                message: err
            });
        }
        let token = jwt.sign({
            usuario: usuarioDb
        }, 'este-es-el-seed-de-desarrollo', { expiresIn: 60 * 60 * 24 * 30 })
        res.json({
            ok: true,
            usuario: usuarioDb,
            token
        })
    })
});

module.exports = app