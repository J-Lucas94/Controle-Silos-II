const express = require('express')
const router = express.Router()

//Controller

const MovimentsController = require('../controller/LoadingControllers')

//helpers
const { eAdmin } = require('../helpers/eAdmin')

router.get('/create', MovimentsController.createLoading)
router.post('/create', MovimentsController.createLoadingSave)
router.get('/edit/:id', MovimentsController.editLoading)
router.post('/edit/:id', MovimentsController.editLoadingPost)
router.get('/show', MovimentsController.showLoadind)

module.exports = router