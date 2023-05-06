const { Router } = require('express')
const router = Router()

// Importar todos los routers;
const products = require('./products.view.router')

// Configurar los routers
router.use('/products', products)

module.exports = router