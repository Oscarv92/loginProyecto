const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    nombre: String,
    apellido: String,
    correo: String,
    ciudad_interes: String,
    contrasena: String,
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('cliente', clienteSchema)