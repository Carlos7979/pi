const { Router } = require('express')
const { messageManager } = require('../../dao/MongoDB')
const router = Router()

router.get('/', async (req, res, next) => {
    const messages = await messageManager.getMessages()
    try {
        res.render('chat', { messages })
    } catch (error) {
        next(error)
    }
})

module.exports = router
