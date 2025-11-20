const jwt = require('jsonwebtoken');
const { model } = require('mongoose');
function auth(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:'UNAUTHORISED'
        })
    }
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decoded
        return next();
    }
    catch(err){
        return res.status(401).json({
            message:'UNAUTHORISED'

    })
}
}
module.exports = auth;