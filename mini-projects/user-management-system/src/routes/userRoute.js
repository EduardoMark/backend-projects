const express = require('express');
const { validateUserQuery, validateUserBody, validateUserIdParam, validateUserBodyForUpdate } = require('../middlewares/validate');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users', validateUserQuery, userController.getUser);
router.post('/users', validateUserBody, userController.createUser);
router.put('/users/:id', validateUserIdParam, validateUserBodyForUpdate, userController.updateUser);
router.delete('/users/:id', validateUserIdParam, userController.deleteUser);

module.exports = router;