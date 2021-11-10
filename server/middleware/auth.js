const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    //Read the hearder token
    const token = req.header('x-auth-token')
    console.log(token)
    // res.send('all is working')
    if (!token) {
        return res.status(401).json({ msg: 'token doenst exist, invalid access'})
    }

    try {
        const encryption = jwt.verify(token, process.env.SECRET)
        req.user = encryption.user
        next()
    } catch (error) {
        res.status(401).json({msg: 'Invalid token'})
    }
}