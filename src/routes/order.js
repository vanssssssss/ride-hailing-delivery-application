const express = require('express')
const router = express.Router()

const {placeOrder,trackOrder} = require('../controllers/order')

router.route('/').post(placeOrder)
router.route('/:orderId').get(trackOrder)

module.exports = router