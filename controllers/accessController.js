const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const token = req.header('authorization_token');
    if(!token) return res.status(401).send('Access Denied');

    err = {
        msg:'Your Not Admin: Access Denied!!'
    }

    if (req.user.perfil !== 'admin') return res.status(401).send(err);
    
    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET_ACCESS);
        req.user = userVerified;
        next()
    } catch (error) {
        err.msg = 'Access Denied!'
        res.status(401).send(err)
    }

}