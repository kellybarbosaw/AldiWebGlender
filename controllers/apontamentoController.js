const db = require('../db_Querys/db_apontamento');
const {registerValidate,registerValidateUpdate} = require('./validates/ApontamentoValidate');


const apontamentoController = {
    select: async function (req,res){

        let apontamento = [];
        try {
            apontamento = await db.selectAapontamentos();
            res.send(apontamento);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectId: async function (req,res){
        try {
            let selectApontamento = await db.selectAapontamento(req.params.id);
            res.status(200).send(selectApontamento[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    register: async function (req,res){

        const {error} = registerValidate(req.body)
        if(error){return res.status(400).send(error.message)};

        // const selectApontamento = await db.selectAapontamento(req.body.idprojetotarefa);
        

        // if(selectApontamento[0] !== null && selectApontamento[0].length > 0){
        //     return res.status(400).send('Projeto tarefa already exists');
        // }     

        const newApontamento = new Object ({
            idprojetotarefa: req.body.idprojetotarefa,
            data: req.body.data,
            horainicio: req.body.horainicio,
            horafinal: req.body.horafinal,
            descricao: req.body.descricao,
            dtcriacao: req.body.dtcriacao,
            dtmodificacao: req.body.dtmodificacao,
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
        })

        try {
            const savedApontamento = await db.insertAapontamento(newApontamento);
            res.status(200).send(savedApontamento);
        } catch (error) {
            res.status(400).send(error)
        }

    },

    update: async function (req,res){
        
        const {error} = registerValidateUpdate(req.body)
        if(error){return res.status(400).send(error.message)};

        const selectApontamento = await db.selectATarefaStatus(req.body.idprojetotarefa);
        
        if(selectApontamento[0] !== null && selectApontamento[0].length > 1){
            return res.status(400).send('Título already exists');
        }     

        const UpdateApontamento = new Object ({
            idprojetotarefa: req.body.idprojetotarefa,
            data: req.body.data,
            horainicio: req.body.horainicio,
            horafinal: req.body.horafinal,
            descricao: req.body.descricao,
            dtcriacao: req.body.dtcriacao,
            dtmodificacao: req.body.dtmodificacao,
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
        })

        try {
            const savedApontamento = await db.updateAapontamento(req.body.idapontamento,UpdateApontamento);
            res.status(200).send(savedApontamento);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async function (req,res){

        try {
            const delApontamento = await db.deleteAapontamento(req.params.id);
            res.status(200).send(delApontamento);
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = apontamentoController