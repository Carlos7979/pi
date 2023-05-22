const { Router } = require('express')
const { Users } = require('../../dao/MongoDB')
const router = Router()

router.get('/', async (req, res, next) => {
	const { limit, page } = req.query
    const usersPaginated = await Users.getPaginatedUsers(Number(limit), Number(page))
    try {
        res.render('users', { ...usersPaginated })
    } catch (error) {
        next(error)
    }
})

module.exports = router
