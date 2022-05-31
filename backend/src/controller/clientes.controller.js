const clienteCtrl = {};
const clienteModel = require('../models/clientes.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

clienteCtrl.crearCliente = async(req, res) => {
    const { nombre, apellido, correo, ciudad_interes, contrasena } = req.body
    const nuevoCliente = new clienteModel({
        nombre,
        apellido,
        correo,
        ciudad_interes,
        contrasena
    })

    const correoCliente = await clienteModel.findOne({ correo: correo })
    if (correoCliente) {
        res.json({
            mensaje: 'El usuario ya existe'
        })
    } else {
        nuevoCliente.contrasena = await bcrypt.hash(contrasena, 10)
        const token = jwt.sign({ _id: clienteModel._id }, 'Secreta')
        await nuevoCliente.save()
        res.json({
            mensaje: 'Bienvenido',
            id: nuevoCliente._id,
            nombre: nuevoCliente.nombre,
            token
        })
    }
}

clienteCtrl.login = async(req, res) => {
    const { correo, contrasena } = req.body
    const cliente = await clienteModel.findOne({ correo: correo })
    if (!cliente) {
        return res.json({
            mensaje: 'correo incorrecto'
        })
    }

    const match = await bcrypt.compare(contrasena, cliente.contrasena)
    if (match) {

        const token = jwt.sign({ _id: cliente._id }, 'Secreta')
        res.json({
            mensaje: 'Bienvenido',
            id: cliente.id,
            nombre: cliente.nombre,
            token
        })

    } else {
        res.json({
            mensaje: 'Contraseña incorrecta'
        })
    }

}

module.exports = clienteCtrl