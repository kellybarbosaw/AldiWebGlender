const db = require('../db_Querys/db.tarefaStatus');
const {registerValidate,registerValidateUpdate} = require('./validates/TarefaStatusValidate');


const tarefaStatusController = {
    select: async function (req,res){

        let tarefaStatus = [];
        try {
            tarefaStatus = await db.selectATarefasStatus();
            res.send(tarefaStatus);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectId: async function (req,res){
        try {
            let selectTarefaS = await db.selectATarefaStatus(req.params.id);
            res.status(200).send(selectTarefaS[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    register: async function (req,res){

        const {error} = registerValidate(req.body)
        if(error){return res.status(400).send(error.message)};

        const selectTarefaS = await db.selectATarefaStatus(req.body.titulo);
        

        if(selectTarefaS[0] !== null && selectTarefaS[0].length > 0){
            return res.status(400).send('Título already exists');
        }     

        const newTarefaStatus = new Object ({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            nomefantasia: req.body.nomefantasia,
            datacriacao: req.body.datacriacao,
            dataalteracao: req.body.dataalteracao,
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
            status: req.body.status,
        })

        try {
            const savedTarefaStatus = await db.insertATarefaStatus(newTarefaStatus);
            res.status(200).send(savedTarefaStatus);
        } catch (error) {
            res.status(400).send(error)
        }

    },

    update: async function (req,res){
        
        const {error} = registerValidateUpdate(req.body)
        if(error){return res.status(400).send(error.message)};

        const selectTarefaS = await db.selectATarefaStatus(req.body.titulo);
        
        if(selectTarefaS[0] !== null && selectTarefaS[0].length > 1){
            return res.status(400).send('Título already exists');
        }     

        const UpdateTarefaStatus = new Object ({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            nomefantasia: req.body.nomefantasia,
            datacriacao: req.body.datacriacao,
            dataalteracao: req.body.dataalteracao,
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
            status: req.body.status,
        })

        try {
            const savedTarefaStatus = await db.updateATarefaStatus(req.body.idstatus,UpdateTarefaStatus);
            res.status(200).send(savedTarefaStatus);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async function (req,res){

        try {
            const delTarefaStatus = await db.deleteATarefaStatus(req.params.id);
            res.status(200).send(delTarefaStatus);
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = tarefaStatusController