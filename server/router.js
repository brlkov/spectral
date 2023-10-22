const Router = require('express')
const router = new Router()
const controller = require('./controller')


router.post('/element', controller.element)
router.post('/save-element', controller.saveElement)
router.post('/delete-element', controller.deleteElement)
router.get('/get-elements', controller.getAllElements)


router.post('/check', controller.check)
router.post('/substance', controller.substance)
router.post('/delete-substance', controller.deleteSubstance)
router.get('/get-substances', controller.getAllSubstances)

module.exports = router
