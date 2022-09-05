const express = require('express')
const router = express.Router()

const AppointmentsController = require('../controller/AppointmentsController')

const { eAdmin } = require('../helpers/eAdmin')

router.get('/create', AppointmentsController.createAppointments)
router.post('/create', AppointmentsController.createAppointmentsPost)

module.exports = router