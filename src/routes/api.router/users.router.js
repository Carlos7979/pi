const { Router } = require('express')
const router = Router()
const passport = require('passport')
const { passportCall } = require('../../middleware')
const {
    userController: { createUser, loginUser, githubCallback, logoutUser }
} = require('../../services')

router.post('/', createUser)

router.post('/login', loginUser)

router.get('/github', passportCall('github'))

router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/login', session: false }),
    githubCallback
)

router.post('/logout', logoutUser)

// router.get('/:uid', async (req, res, next) => {
//     try {
//         let { uid } = req.params
//         const user = await Users.getUserById(uid)
//         if (user === 'Not found') {
//             return res
//                 .status(400)
//                 .send({ status: 'error', error: `El usuario con el id ${uid} no existe` })
//         }
//         return res.send({ status: 'success', payload: user })
//     } catch (error) {
//         next(error)
//     }
// })

module.exports = router
