//Importaciones
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


//"Interfaces"
let rolPermitido = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true
    },
    pass: {
        type: String,
        required: [true, "Se necesita el pass"]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: rolPermitido
    },
    estado: {
        type: Boolean,
        required: [true, "Se necesita el estado"]
    },
    google: {
        type: Boolean,
        required: [true, "Necesita autenticarse con google"]
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.pass;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
});
module.exports = mongoose.model('Usuario', usuarioSchema);