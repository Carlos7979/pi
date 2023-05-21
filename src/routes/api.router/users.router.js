const { Router } = require('express')
const router = Router()
const { Users } = require('../../dao/MongoDB')

// router.post('/', async (req, res, next) => {
//     const { title, description, code, price, status, stock, category, thumbnails } = req.body
//     if (!title || !description || !code || !price || !status || !stock || !category)
//         return res.status(400).send({ status: 'error', error: 'Todos los campos son obligatorios' })
//     try {
//         const product = await Products.addProduct(
//             title,
//             description,
//             code,
//             price,
//             status,
//             stock,
//             category,
//             thumbnails
//         )
//         if (product === 'El valor de code debe ser único')
//             return res
//                 .status(400)
//                 .send({ status: 'error', error: 'El valor de code debe ser único' })
//         res.send({ status: 'success', payload: product })
//     } catch (error) {
//         next(error)
//     }
// })

// router.post('/upload', uploader.single('myFile'), (req, res, next) => {
//     res.send({ status: 'success', message: 'Archivo subido con éxito' })
// })

router.get('/', async (req, res, next) => {
    let { limit } = req.query
    limit = Number(limit)
    try {
        const users = await Users.getUsers()
        if (limit && typeof limit === 'number' && limit > 0) {
            return res.send(users.slice(0, limit))
        }
        return res.send({ status: 'success', payload: users })
    } catch (error) {
        next(error)
    }
})

router.get('/:uid', async (req, res, next) => {
    try {
        let { uid } = req.params
        const user = await Users.getUserById(uid)
        if (user === 'Not found') {
            return res
                .status(400)
                .send({ status: 'error', error: `El usuario con el id ${uid} no existe` })
        }
        return res.send({ status: 'success', payload: user })
    } catch (error) {
        next(error)
    }
})

// router.put('/:pid', async (req, res, next) => {
//     try {
//         let { pid } = req.params
//         const product = await Products.updateProduct(pid, req.body)
//         if (product === 'Not found') {
//             return res
//                 .status(400)
//                 .send({ status: 'error', error: `El producto con el id ${pid} no existe` })
//         }
//         if (product === 'El valor de code debe ser único') {
//             return res
//                 .status(400)
//                 .send({ status: 'error', error: `El valor de code ya existe para otro producto` })
//         }
//         return res.send({ status: 'success', payload: product })
//     } catch (error) {
//         next(error)
//     }
// })

// router.delete('/:pid', async (req, res, next) => {
//     try {
//         let { pid } = req.params
//         const product = await Products.deleteProduct(pid)
//         if (product === 'Not found') {
//             return res
//                 .status(400)
//                 .send({ status: 'error', error: `El producto con el id ${pid} no existe` })
//         }
//         return res.send({ status: 'success', payload: product })
//     } catch (error) {
//         next(error)
//     }
// })

module.exports = router
