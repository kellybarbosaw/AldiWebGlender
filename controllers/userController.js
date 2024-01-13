const db = require('../bd');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(15);
const jwt = require('jsonwebtoken');
const {loginValidate,regiterValidate} = require('./validates/LoginValidate');




const userController = {
    register: async function (req,res){

        const {error} = regiterValidate(req.body)
        if(error){return res.status(400).send(error.message)};

        const selectUser = await db.selectUser(req.body.email);

        if(selectUser[0] !== null && selectUser[0].length > 0){
            return res.status(400).send('Email already exists');
        }
        

        const newUser = new Object ({
            nome: req.body.nome,
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.senha,salt),
            perfil: req.body.perfil,
            status: req.body.status
        })

        try {
            const savedUser = await db.insertUser(newUser);
            res.send(savedUser);
        } catch (error) {
            res.status(400).send(error)
        }

    },

    login: async function (req,res){

        let user = {
            'authorization': '',
            'msg':''
        }

        const {error} = loginValidate(req.body)
        if(error){return res.status(400).send(error.message)};

        const selectUser = await db.selectUser(req.body.email);

        // console.log(selectUser[0][0])

        if(selectUser[0] !== null && selectUser[0].length === 0){
            user.msg='Email or Password incorret';
            return res.status(400).send(user);
        }

        const passwordAndUserMatch = bcrypt.compareSync(req.body.senha,selectUser[0][0].senha);

        if(!passwordAndUserMatch){
            user.msg='Email or Password incorret';
            return res.status(400).send(user);
        }

        const token = jwt.sign({ID_user: selectUser[0][0].ID_user, perfil: selectUser[0][0].perfil }, process.env.TOKEN_SECRET_ACCESS, { expiresIn: 30 });
        user = {
            'authorization': token,
            'msg':'login autorizado'
        }

        res.header('authorization',token);
        res.send(user); 

    }
}

module.exports = userController





