const Router = require('express')
const router = new Router()
const controller = require('./controller')


router.post('/create', controller.create)
router.post('/save', controller.save)
router.post('/delete', controller.delete)
router.get('/', controller.getAll)

module.exports = router
