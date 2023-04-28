const jwt = require('jsonwebtoken')
require('dotenv').config()

const verify_token = (req,res,next) => {
    // const token = req.query.token || req.headers["x-access-token"]

    if(!token)
        return res.status(403).send("Please Login")
    
    try 
    {
        const decoded = jwt.verify( token, process.env.TOKEN_KEY)
        req.user = decoded
    }
    catch (e) {
        return res.status(401).send("Invalid Token")
    }
    return next()
}

module.exports = verify_token