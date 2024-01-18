const db = require('../bd');
const {regiterValidate,regiterValidateUpdate} = require('./validates/ProjectValidate');


const projectController = {
    select: async function (req,res){

        let projects = [];
        try {
            projects = await db.selectAllProjects();
            res.send(projects);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectId: async function (req,res){
        try {
            let selectProject = await db.selectProject(req.params.id);
            res.status(200).send(selectProject[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectProjectsContract: async function (req,res){
        try {
            let selectProjects = await db.selectProjectsContract(req.params.id);
            res.status(200).send(selectProjects[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },
    selectProjectsClients: async function (req,res){
        try {
            let selectProjects = await db.selectProjectsClients(req.params.id);
            res.status(200).send(selectProjects[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    register: async function (req,res){


        const {error} = regiterValidate(req.body)
        if(error){return res.status(400).send(error.message)};
        

        const newProjectt = new Object ({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            idcliente: req.body.idcliente,
            dtcriacao: req.body.dtcriacao,
            dtalteracao: req.body.dtalteracao,
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
            statusprojeto: req.body.statusprojeto,
            idvenda: req.body.idvenda,
            dtinicioprojeto: req.body.dtinicioprojeto, 
            dtconclusaoprojeto: req.body.dtconclusaoprojeto, 
            horasestimadas: req.body.horasestimadas ,
            horasgastas: req.body.horasgastas,
            valorprojeto: req.body.valorprojeto,
            valorconsumido: req.body.valorconsumido 
        })

        try {
            const savedProject = await db.insertProject(newProjectt);
            res.status(200).send(savedProject);
        } catch (error) {
            res.status(400).send(error)
        }

    },

    update: async function (req,res){
        
        const {error} = regiterValidateUpdate(req.body)
        if(error){return res.status(400).send(error.message)};
   
        const updateProject = new Object ({
            idprojeto: req.body.idprojeto,
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            idcliente: req.body.idcliente,
            dtcriacao: req.body.dtcriacao,
            dtalteracao: req.body.dtalteracao,
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
            statusprojeto: req.body.statusprojeto,
            idvenda: req.body.idvenda,
            dtinicioprojeto: req.body.dtinicioprojeto, 
            dtconclusaoprojeto: req.body.dtconclusaoprojeto, 
            horasestimadas: req.body.horasestimadas ,
            horasgastas: req.body.horasgastas,
            valorprojeto: req.body.valorprojeto,
            valorconsumido: req.body.valorconsumido 
        })

        try {
            const savedProject = await db.updateProject(req.body.idprojeto,updateProject);
            res.status(200).send(savedProject);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async function (req,res){

        try {
            const delProject = await db.deleteProject(req.params.id);
            res.status(200).send(delProject);
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = projectController
