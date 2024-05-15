const express = require('express')
const router = express.Router()

const workerController = require('../controller/workerCtrl')

router.get('/', workerController.getAllUser)
router.post('/', workerController.createUser)
router.get('/id', workerController.getUserById);
router.get('/:username', workerController.getUserByUsername)
router.post('/login',workerController.login)
router.delete('/', workerController.deleteUserById)
router.patch('/:id', workerController.update)

module.exports = router