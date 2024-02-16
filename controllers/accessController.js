const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const token = req.header('authorization');
    if(!token) return res.status(401).send('Access Denied');

    if (req.user.perfil !== 'admin') return res.status(401).send('Your Not Admin: Access Denied!');
    
    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET_ACCESS);
        req.user = userVerified;
        next()
    } catch (error) {
        res.status(401).send('Access Denied!')
    }

}