const db = require('../db_Querys/db_recurso');
const {
    registerValidate,
    registerValidateUpdate
} = require("./validates/RecursoValidate");

const recursoController = {
    select: async function (req,res){
        let recursos = [];
        try {
            recursos = await db.selectZRecursos();
            res.send(recursos);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectId: async function (req,res){
        try {
            let selectRecurso = await db.selectZRecurso(req.params.id);
            res.status(200).send(selectRecurso[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    register: async function (req,res){
        const {error} = registerValidate(req.body)
        if(error){
            return res.status(400).send(error.message)
        };

        const selectRecurso = await db.selectZRecursoTipo(req.body.tiporecurso, req.body.idpessoa);
        console.log(selectRecurso);

        if(selectRecurso[0] !== null && selectRecurso[0].length > 0){
            return res.status(400).send("Tipo de recurso já existe");
        } 

        const novoRecurso = new Object ({
            idpessoa: req.body.idpessoa,
            tiporecurso: req.body.tiporecurso,
            datainicio: req.body.datainicio,
            datafim: req.body.datafim,
            datacriacao: req.body.datacriacao,
            dataalteracao: req.body.dataalteracao,
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
            ativo: req.body.ativo,
            valorhr: req.body.valorhr,
        })
        
        try {
            const savedRecurso = await db.insertZRecurso(novoRecurso);
            res.status(200).send(savedRecurso);
        } catch (error) {
            res.status(400).send(error)
        }
        
    },

    update: async function (req,res){
        
        const {error} = registerValidateUpdate(req.body)
        if(error){
            return res.status(400).send(error.message)
        };

        const selectRecurso = await db.selectZRecursoTipo(req.body.tiporecurso, req.body.idpessoa);
        console.log(selectRecurso[0]);
        
        if(selectRecurso[0] !== null && selectRecurso[0].length > 1){
            return res.status(400).send("Tipo de recurso já cadastrado para este usuário");
        }     

        const UpdateRecurso = new Object ({
            idpessoa: req.body.idpessoa,
            tiporecurso: req.body.tiporecurso,
            datainicio: req.body.datainicio,
            datafim: req.body.datafim,
            datacriacao: req.body.datacriacao,
            dataalteracao: req.body.dataalteracao,
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
            ativo: req.body.ativo,
            valorhr: req.body.valorhr,
        })

        try {
            const savedRecurso = await db.updateZRecurso(
                req.body.idrecurso,
                UpdateRecurso
                );
            res.status(200).send(savedRecurso);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async function (req,res){
        try {
            const delRecurso = await db.deleteZRecurso(req.params.id);
            res.status(200).send(delRecurso);
        } catch (error) {
            res.status(400).send(error)
        }
    }
};

module.exports = recursoController