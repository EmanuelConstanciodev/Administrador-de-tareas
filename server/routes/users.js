const express = require('express')

const router = express.Router()
const userController = require('../controllers/userController')
const { check } = require('express-validator')

//Create an user
//Endpoint: api/users





router.post('/', 
    [
        check('name', 'The name is obligatory').not().isEmpty(),
        check('email', 'Add a valid email').isEmail(),
        check('password', 'The password should be 6 characters at least').isLength({min: 6})
    ],
    userController.makeUser

);
module.exports = router