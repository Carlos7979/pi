const { Router } = require('express')
const { Products } = require('../../dao/MongoDB')
const router = Router()

// router.get('/home', async (req, res) => {
// 	const products = await Product.getProducts()
// 	try {

// 		res.render('home', { products })
// 	} catch (error) {
// 		console.log(error);
// 	}
// })

router.get('/', async (req, res, next) => {
    const products = await Products.getProducts()
    try {
        res.render('products', { products })
    } catch (error) {
        next(error)
    }
})

module.exports = router
