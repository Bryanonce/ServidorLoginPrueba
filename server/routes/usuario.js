//Importaciones
const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const usuario = require('../models/usuario');
const app = express();


app.get('/usuario', (req, res) => {
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 10;
    desde = Number(desde);
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    description: err
                })
            }
            res.json({
                ok: true,
                usuarios: usuarios
            })
        })
})

app.post('/usuario', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        pass: bcrypt.hashSync(body.pass, 10),
        role: body.role,
        estado: body.estado,
        google: body.google
    });
    usuario.save((err, usuarioDb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                description: "Ocurrió un error",
                falla: err
            })
        }
        res.json({
            ok: true,
            usuarioDb
        })
    })
})

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDb
        })
    })

})

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    //body.value = false;
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioDb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                description: err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDb
        })
    })
})

module.exports = app;