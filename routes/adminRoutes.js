const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.get('/',auth,(req,res)=>{

    if(req.user.perfil === 'admin') {
        res.status(200).send("Authorized User")
    }else{
        res.status(401).send('Your Not Admin: Access Denied')
    }

})

module.exports = router;