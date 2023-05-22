const { Schema } = require('mongoose')

const carts = new Schema({
	products: {
		type: [{
            product: { type: Schema.Types.ObjectId, ref: 'Products' },
            quantity: { type: Number, min: 1 }
        }],
		default: []
	}
})

// carts.pre('findOne', function() {
// 	this.populate('products.product')
// })

module.exports = carts