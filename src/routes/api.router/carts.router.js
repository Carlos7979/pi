const { Router } = require('express');
const router = Router()
const { Carts, Products } = require('../../dao/fileSystem');

router.post('/', async (req, res) => {
	try {
		const cart = await Carts.addCart()
		res.send({ status: "success", payload: cart })
	} catch (error) {
		console.log(error)
	}
})

router.post('/:cid/product/:pid', async (req, res) => {
	const { cid, pid } = req.params
	try {
		const product = await Products.getProductById(pid)
		if (product === 'Not found') return res.status(400).send( {status: "error", error: `El producto con el id ${pid} no existe`} )
		const products = await Carts.addProduct(cid, product)
		if (products === 'Cart not found') return res.status(400).send( {status: "error", error: `El carrito con el id ${cid} no existe`} )
		res.send({ status: "success", payload: products })
	} catch (error) {
		console.log(error)
	}
})

router.get('/:cid', async (req, res) => {
	const { cid } = req.params
	try {
		const cart = await Carts.getProductsByCartId(cid)
		if (cart === 'Not found') return res.status(400).send( {status: "error", error: `El carrito con el id ${cid} no existe`} )
		return res.send({ status: "success", payload: cart.products })
	} catch (error) {
		console.log(error)
	}
})

module.exports = router