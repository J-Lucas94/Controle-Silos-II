const express = require('express')
const router = express.Router()


const BalanceController = require('../controller/BalanceController')

const { eAdmin } = require('../helpers/eAdmin')

router.get('/show', BalanceController.showBalance)

module.exports = router