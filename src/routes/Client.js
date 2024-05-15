const express = require('express')
const router = express.Router()
const userController = require('../controller/clientCtrl')

router.get('/', userController.getAllUsers)
router.post('/', userController.createUser)
router.get('/id', userController.getUserById);
router.get('/:username', userController.getUserByUsername)
router.post('/login', userController.login)
router.delete('/', userController.deleteUserById)
router.patch('/:id', userController.update)

module.exports = router