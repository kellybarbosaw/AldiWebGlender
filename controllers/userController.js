const db = require('../db_Querys/db_users');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(15);
const jwt = require('jsonwebtoken');
const {loginValidate,registerValidate} = require('./validates/LoginValidate');

const userController = {

    select: async function (req, res) {
        let offset = req.query.offset;
        let limit = req.query.limit;
        let result = [];
        let Users = [];

        function estruturar(users, offset, limit) {
            let indexUsers = parseInt(offset);

            if (!offset && !limit) {
                result = users;
            } else {
                for (let index = 0; index < limit; index++) {

                    if (Users[indexUsers] !== undefined) {
                        result.push(Users[indexUsers])
                    }
                    indexUsers += 1;
                }
            }
        }
        try {
            Users = await db.selectUsers();
            estruturar(Users, offset, limit)
            res.setHeader('Quantidades_Registros', Users.length);
            res.send(result);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    register: async function (req,res){

        const {error} = registerValidate(req.body)
        if(error){return res.status(400).send(error.message)};

        const selectUser = await db.selectUser(req.body.email);

        if(selectUser[0] !== null && selectUser[0].length > 0){
            return res.status(400).send({ message: 'E-mail já Existe!'});
        }
        

        const newUser = new Object ({
            usuario: req.body.usuario,
            nome: req.body.nome,
            ativo: req.body.ativo,
            perfil: req.body.perfil,
            datacriacao: req.body.datacriacao,
            dataalteracao: req.body.dataalteracao,
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
            senha: bcrypt.hashSync(req.body.senha,salt),
            email: req.body.email
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

        const passwordAndUserMatch = bcrypt.compareSync(req.body.senha, selectUser[0][0].SENHA);

        if(!passwordAndUserMatch){
            user.msg='Email or Password incorret';
            return res.status(400).send(user);
        }

        const token = jwt.sign({ID_user: selectUser[0][0].USUARIO, perfil: selectUser[0][0].PERFIL }, process.env.TOKEN_SECRET_ACCESS, { expiresIn: 1200 });
        user = {
            'authorization': token,
            'msg':'login autorizado',
            'user':selectUser[0][0].USUARIO,
            'perfil':selectUser[0][0].PERFIL
        }

        res.header('authorization',token);
        res.send(user); 

    },

    selectUser: async function (req, res) {

        try {
            let selectClient = await db.selectForUser(req.params.user);
            res.status(200).send(selectClient[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    update: async function (req, res) {

        const { error } = registerValidate(req.body)
        if (error) { return res.status(400).send(error.message) };

        const selectUser = await db.selectForUser(req.body.usuario);

        if (selectUser[0] !== null && selectUser[0].length > 1) {
            return res.status(400).send({ message:'Usuário Já exists'});
        }

        const UpdateUser = new Object({
            usuario: req.body.usuario,
            nome: req.body.nome,
            ativo: req.body.ativo,
            perfil: req.body.perfil,
            datacriacao: req.body.datacriacao,
            dataalteracao: req.body.dataalteracao,
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
            email: req.body.email
        })

        try {
            const savedUser = await db.updateUser(req.body.usuario, UpdateUser);
            res.status(200).send(savedUser);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async function (req, res) {

        try {
            const delUser = await db.deleteUser(req.params.user);
            res.status(200).send(delUser);
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = userController





