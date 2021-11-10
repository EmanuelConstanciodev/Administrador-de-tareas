const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

//LOGIN
exports.authUser = async (req, res) => {

     //Checking Erros
     const errors = validationResult(req);
     //Looking for errors
     if(!errors.isEmpty()) {
         return res.status(400).json({errors: errors.array() })
     }

     const { email, password } = req.body;

     try {
         //Finding user by email on DB
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({msg: 'User doesnt exist'})
        }

        //Checking password on Db
        const rightPassword = await bcryptjs.compare(password,user.password)
        if (!rightPassword) {
            return res.status(400).json({msg: 'Incorrect password'})
        }

        //jwt
        const payload = {
            user: {
                id: user.id
            }

        }   //sign of the JWT
        jwt.sign(payload, process.env.SECRET, {
            // expiresIn: process.env.TIME
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;

            console.log(token)
            res.json({ token })

        })

     } catch (error) {
         console.log(error)
     }
}