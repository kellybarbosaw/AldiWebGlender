const db = require('../db_Querys/db.projetoStatus');
const {registerValidate,registerValidateUpdate} = require('./validates/ProjetoStatusValidate');


const projetoStatusController = {
    select: async function (req,res){

        let projetoStatus = [];
        try {
            projetoStatus = await db.selectAProjetosStatus();
            res.send(projetoStatus);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectId: async function (req,res){
        try {
            let selectProjetoS = await db.selectAProjetoStatus(req.params.id);
            res.status(200).send(selectProjetoS[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    register: async function (req,res){

        const {error} = registerValidate(req.body)
        if(error){return res.status(400).send(error.message)};

        const selectProjetoS = await db.selectAProjetoStatus(req.body.titulo);
        

        if(selectProjetoS[0] !== null && selectProjetoS[0].length > 0){
            return res.status(400).send('Título already exists');
        }     

        const newProjetoStatus = new Object ({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            datacriacao: req.body.datacriacao,
            dataalteracao: req.body.dataalteracao,
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
            status: req.body.status,
        })

        try {
            const savedProjetoStatus = await db.insertAProjetoStatus(newProjetoStatus);
            res.status(200).send(savedProjetoStatus);
        } catch (error) {
            res.status(400).send(error)
        }

    },

    update: async function (req,res){
        
        const {error} = registerValidateUpdate(req.body)
        if(error){return res.status(400).send(error.message)};

        const selectProjetoS = await db.selectAProjetoStatus(req.body.titulo);
        
        if(selectProjetoS[0] !== null && selectProjetoS[0].length > 1){
            return res.status(400).send('Título already exists');
        }     

        const UpdateProjetoStatus = new Object ({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            datacriacao: req.body.datacriacao,
            dataalteracao: req.body.dataalteracao,
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
            status: req.body.status,
        })

        try {
            const savedProjetoStatus = await db.updateAProjetoStatus(req.body.idstatus,UpdateProjetoStatus);
            res.status(200).send(savedProjetoStatus);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async function (req,res){

        try {
            const delProjetoStatus = await db.deleteAProjetoStatus(req.params.id);
            res.status(200).send(delProjetoStatus);
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = projetoStatusController