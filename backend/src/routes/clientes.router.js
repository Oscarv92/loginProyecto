const { Router } = require('express');
const router = Router();
const clienteCtrl = require('../controller/clientes.controller');

router.post('/crearCliente', clienteCtrl.crearCliente);
router.post('/login', clienteCtrl.login);


module.exports = router