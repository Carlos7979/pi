const { Router } = require('express')
const { userManager } = require('../../dao/MongoDB')
const router = Router()

router.get('/', async (req, res, next) => {
	const { limit, page } = req.query
    const usersPaginated = await userManager.getPaginatedUsers(Number(limit), Number(page))
    try {
        res.render('users', { ...usersPaginated })
    } catch (error) {
        next(error)
    }
})

module.exports = router
