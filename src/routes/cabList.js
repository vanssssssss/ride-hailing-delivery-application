const express = require('express')
const router = express.Router()
const {
    getAllCabs,   
    createCab,
    getCab,
    updateCab,
    deleteCab
} = require('../controllers/cabList')

//to parse json data
router.use(express.json())

router.route('/').get(getAllCabs)
router.route('/').post(createCab)
router.route('/:cabId').get(getCab).patch(updateCab).delete(deleteCab)

module.exports = router