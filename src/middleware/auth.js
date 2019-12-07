const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req, res, next) => {
    console.log("entro en auth");
    const token = req.header('Authorization').replace('Bearer ', '')
    
    try {
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user =  User.findOne({ _id: data._id, 'tokens.token': token })
        console.log("user: "+ user)
        if (!user) {
            res.status(401).send({ error: 'Not authorized unable to find user' })
            /*throw new Error()*/
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        console.log("entro en elcatch")
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth