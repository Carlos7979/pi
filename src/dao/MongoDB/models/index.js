const mongoose = require('mongoose')

const { products, carts, messages } = require('./schemas')

const model = mongoose.model.bind(mongoose)

module.exports = {
    Products: model('Products', products),
    Carts: model('Carts', carts),
    Messages: model('Messages', messages)
}
