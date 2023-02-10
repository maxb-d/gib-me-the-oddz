const express = require('express')
const router = express.Router()
const path = require('path')

const computeController = require('../controllers/computeController')

router.route('/')
    .post(computeController.getOdds)

module.exports = router