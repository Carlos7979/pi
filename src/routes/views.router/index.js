const { Router } = require('express')
const router = Router()

// Importar todos los routers;
const products = require('./products.view.router')
const users = require('./users.view.router')
const chat = require('./chat.view.router')
const home = require('./home.view.router')

// Configurar los routers
router.use('/products', products)
router.use('/users', users)
router.use('/chat', chat)
router.use('/', home)

module.exports = router
