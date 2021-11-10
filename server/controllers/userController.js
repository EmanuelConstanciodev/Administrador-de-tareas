const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.makeUser = async(req,res) => {


    //Checking Erros
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() })
    }
    const { email, password } = req.body
    
    try {

        let user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({ msg: 'This user already exist'})

        }

        user = new User(req.body) 

        //This command will hash the password and if some password are the same, the hash will be diferent
        const salt = await bcryptjs.genSaltSync(10)
        console.log(salt)
        user.password = await bcryptjs.hash(password, salt)

        
        await user.save()


        const payload = {
            user: {
                id: user.id
            }

        }
        jwt.sign(payload, process.env.SECRET, {
            //expiresIn: process.env.TIME
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;

            console.log(token)
            res.json({ token })

        })

        // res.json({ msg: 'User success'})
    } catch (error) {
        console.log(error)
        res.status(400).send('Something wrong')
    }
}