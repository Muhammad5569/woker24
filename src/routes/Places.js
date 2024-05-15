const express = require('express')
const router = express.Router()
const placeController = require('../controller/placeCtrl')

router.get('/', placeController.getAllPlaces)
router.post('/', placeController.createPlace)
router.get('/id', placeController.getPlaceById);
router.delete('/', placeController.deletePlaceById)
// router.patch('/:id', placeController.update)

module.exports = router