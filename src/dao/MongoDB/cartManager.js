const { Carts } = require('./models')

class CartManager {
    async addCart() {
        try {
            const cart = await Carts.create({})
            return cart
        } catch (error) {
            console.log(error)
        }
    }
    async addProduct(cid, pid) {
        try {
            const cart = await Carts.findById(cid).select('-__v').lean()
            if (!cart) return 'Cart not found'
            let productIndex
            const cartProduct = cart.products.find((e, i) => {
                if (e.product.toString() === pid) {
                    productIndex = i
                    return true
                }
            })
            if (cartProduct) {
                ++cart.products[productIndex].quantity
            } else {
                cart.products.push({
                    product: pid,
                    quantity: 1
                })
            }
            await Carts.findByIdAndUpdate(cid, cart)
            return cart
        } catch (error) {
            console.log(error)
        }
    }
	async deleteProduct(cid, pid) {
        try {
            const cart = await Carts.findById(cid).select('-__v').lean()
            if (!cart) return 'Cart not found'
            let productIndex
            const cartProduct = cart.products.find((e, i) => {
                if (e.product.toString() === pid) {
                    productIndex = i
                    return true
                }
            })
            if (cartProduct && cart.products[productIndex].quantity > 1) {
                --cart.products[productIndex].quantity
            } else if (cartProduct && cart.products[productIndex].quantity === 1) {
                cart.products.splice(productIndex, 1)
            } else {
				return 'Product empty'
			}
            await Carts.findByIdAndUpdate(cid, cart)
            return cart
        } catch (error) {
            console.log(error)
        }
    }
    async getProductsByCartId(cid) {
        try {
            // const cart = await Carts.findById(cid).select('-__v').lean()
            // const cart = await Carts.findOne({ _id: cid }).select('-__v').lean()
            const cart = await Carts.findById(cid).select('-__v').lean().populate('products.product')
            // const cart = await Carts.findById(cid).select('-__v').lean().populate({path:'products.product', select: 'description'})
            if (!cart) return 'Not found'
            return cart.products
        } catch (error) {
            console.log(error)
        }
    }
}

const carts = new CartManager()
module.exports = carts
