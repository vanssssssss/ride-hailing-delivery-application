const express = require('express')
const router = express.Router()
const {getAllCabs} = require('../controllers/cabList')

//to parse json data
router.use(express.json())

router.route('/').post(getAllCabs)

module.exports = router