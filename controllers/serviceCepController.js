const db = require('../db_Querys/db_ServiceCep');

const serviceCepController = {
    selectCep: async function (req, res) {

        res.send("sem função");
        // let projects = [];
        // try {
        //     projects = await db.selectAllProjects();
        //     res.send(projects);
        // } catch (error) {
        //     res.status(400).send(error)
        // }
    },
    selectPais: async function (req, res) {

        let pais = [];
        try {
            pais = await db.selectPais();
            res.send(pais);
        } catch (error) {
            res.status(400).send(error)
        }
    },
    selectEstado: async function (req, res) {

        let estados = [];
        try {
            estados = await db.selectEstado();
            res.send(estados);
        } catch (error) {
            res.status(400).send(error)
        }
    },
    selectEstadoPais: async function (req, res) {

        let estados = [];
        try {
            estados = await db.selectEstadoPais(req.params.id_pais);
            res.send(estados);
        } catch (error) {
            res.status(400).send(error)
        }
    },
    selectCidade: async function (req, res) {

        let cidade = [];
        try {
            cidade = await db.selectCidadeUF(req.params.uf);
            res.send(cidade);
        } catch (error) {
            res.status(400).send(error)
        }
    },
    selectOrgaoEmissor: async function (req, res) {

        let orgaoemissor = [];
        try {
            orgaoemissor = await db.selectOrgaoEmissor();
            res.send(orgaoemissor);
        } catch (error) {
            res.status(400).send(error)
        }
    },

}

module.exports = serviceCepController
