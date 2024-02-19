const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){

    const token = req.header('authorization');
    err = {msg:'Your Not Admin: Access Denied!'}

    if(!token) return res.status(401).send(err);

    try {
        const userVerified = jwt.verify(token,process.env.TOKEN_SECRET_ACCESS);
        req.user = userVerified;
        next()
    } catch (error) {
        res.status(401).send(err)
    }
}

