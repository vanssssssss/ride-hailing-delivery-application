const express = require('express')
const router = express.Router()

const {placeOrder,trackOrder} = require('../controllers/order')

router.route('/').post(placeOrder)
router.route('/:id').get(trackOrder)

module.exports = router