const db = require('../db_Querys/db_projects');
const { registerValidate, registerValidateUpdate } = require('./validates/ProjectValidate');


const projectController = {
    select: async function (req, res) {
        let offset = req.query.offset;
        let limit = req.query.limit;
        let result = [];
        let projects = [];

        function estruturar(projects, offset, limit) {
            let indexProjects = parseInt(offset);

            if (!offset && !limit) {
                result = projects;
            } else {
                for (let index = 0; index < limit; index++) {

                    if (projects[indexProjects] !== undefined) {
                        result.push(projects[indexProjects])
                    }
                    indexProjects += 1;
                }
            }
        }

        try {
            projects = await db.selectAllProjects();
            estruturar(projects, offset, limit)
            res.setHeader('Quantidades_Registros', projects.length);
            res.send(result);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectId: async function (req, res) {
        try {
            let selectProject = await db.selectProject(req.params.id);
            res.status(200).send(selectProject[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectProjectsContract: async function (req, res) {
        try {
            let selectProjects = await db.selectProjectsContract(req.params.id);
            res.status(200).send(selectProjects);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectProjectsClients: async function (req, res) {
        try {
            let selectProjects = await db.selectProjectsClients(req.params.id);
            res.status(200).send(selectProjects);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    register: async function (req, res) {


        const { error } = registerValidate(req.body)
        if (error) { return res.status(400).send(error.message) };

        
        const newProjectt = new Object({
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
            horasestimadas: req.body.horasestimadas,
            horasgastas: req.body.horasgastas,
            saldohoras: req.body.saldohoras,
            valorprojeto: req.body.valorprojeto,
            valorconsumido: req.body.valorconsumido
        })

        if(newProjectt.idvenda === '0') newProjectt.idvenda = null;

        try {
            const savedProject = await db.insertProject(newProjectt);
            res.status(200).send(savedProject);
        } catch (error) {
            res.status(400).send(error)
        }

    },

    update: async function (req, res) {

        const { error } = registerValidateUpdate(req.body)
        if (error) { return res.status(400).send(error.message) };

        const updateProject = new Object({
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
            horasestimadas: req.body.horasestimadas,
            horasgastas: req.body.horasgastas,
            saldohoras: req.body.saldohoras,
            valorprojeto: req.body.valorprojeto,
            valorconsumido: req.body.valorconsumido
        })

        if(newProjectt.idvenda === '0') newProjectt.idvenda = null;

        try {
            const savedProject = await db.updateProject(req.body.idprojeto, updateProject);
            res.status(200).send(savedProject);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async function (req, res) {

        try {
            const delProject = await db.deleteProject(req.params.id);
            res.status(200).send(delProject);
        } catch (error) {
            res.status(400).send(error)
        }
    },
    selectClients: async function (req, res) {
        let client = [];
        try {
            client = await db.selectClients();
            res.send(client);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    selectTarefas: async function (req, res) {
        let tarefas = [];
        try {
            tarefas = await db.selectTarefas();
            res.send(tarefas);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    selectContratos: async function (req, res) {
        let contratos = [];
        try {
            contratos = await db.selectContratos();
            res.send(contratos);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    selectprojetoTarefa: async function (req, res) {
        let projetoTarefa = [];
        try {
            projetoTarefa = await db.selectprojetoTarefa();
            res.send(projetoTarefa);
        } catch (error) {
            res.status(400).send(error);
        }
    },
}

module.exports = projectController
