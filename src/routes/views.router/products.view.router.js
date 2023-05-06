const { Router } = require('express')
const { Product } = require('../../dao/fileSystem')
const router = Router()

// router.get('/home', async (req, res) => {
// 	const products = await Product.getProducts()
// 	try {

// 		res.render('home', { products })
// 	} catch (error) {
// 		console.log(error);
// 	}
// })

router.get('/', (req, res) => {
    console.log('here')
    // const products = await Product.getProducts()
    try {
        // res.render('realTimeProducts', { products })
        res.render('products')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
