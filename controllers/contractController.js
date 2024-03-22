const db = require('../db_Querys/db_contracts');
const { registerValidate, registerValidateUpdate } = require('./validates/ContractValidate');


const contractController = {
    select: async function (req, res) {

        let contract = [];
        try {
            contract = await db.selectContracts();
            res.send(contract);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectId: async function (req, res) {
        try {
            let selectContracts = await db.selectContractID(req.params.id);
            res.status(200).send(selectContracts[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectContractsClient: async function (req, res) {
        try {
            let selectContracts = await db.selectContractClient(req.params.id);
            res.status(200).send(selectContracts);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    register: async function (req, res) {

        const adjustDataForValidation = (data) => {
            // Aqui você pode ajustar seus dados conforme necessário
            // Por exemplo, convertendo strings vazias em null
            const adjustedData = { ...data };
            if (adjustedData.dtcontato === '') adjustedData.dtcontato = null;
            if (adjustedData.dtcontrato === '') adjustedData.dtcontrato = null;
            if (adjustedData.dtassinatura === '') adjustedData.dtassinatura = null;
            if (adjustedData.dtconclusao === '') adjustedData.dtconclusao = null;

            return adjustedData;
        };

        const adjustedData = adjustDataForValidation(req.body);
        const { error } = registerValidate(adjustedData);
        if (error) { return res.status(400).send(error.message) };

        const newContract = new Object({
            idcliente: adjustedData.idcliente,
            descricaovenda: adjustedData.descricaovenda,
            statusvenda: adjustedData.statusvenda,
            idprojeto: adjustedData.idprojeto,
            comercialvendacol: adjustedData.comercialvendacol,

            dtcontato: adjustedData.dtcontato,
            dtcontrato: adjustedData.dtcontrato,
            dtassinatura: adjustedData.dtassinatura,
            dtconclusao: adjustedData.dtconclusao,
            dtcriacao: adjustedData.dtcriacao,
            dtalteracao: adjustedData.dtalteracao,

            usuariocriacao: adjustedData.usuariocriacao,
            usuarioalteracao: adjustedData.usuarioalteracao,
        })

        try {
            const savedContract = await db.insertContract(newContract);
            res.status(200).send(savedContract);
        } catch (error) {
            res.status(400).send(error)
        }

    },

    update: async function (req, res) {

        const adjustDataForValidation = (data) => {
            const adjustedData = { ...data };
            if (adjustedData.dtcontato === '') adjustedData.dtcontato = null;
            if (adjustedData.dtcontrato === '') adjustedData.dtcontrato = null;
            if (adjustedData.dtassinatura === '') adjustedData.dtassinatura = null;
            if (adjustedData.dtconclusao === '') adjustedData.dtconclusao = null;

            return adjustedData;
        };

        const adjustedData = adjustDataForValidation(req.body);
        const { error } = registerValidateUpdate(adjustedData);
        if (error) { return res.status(400).send(error.message) };

        const updateContract = new Object({
            idcliente: adjustedData.idcliente,
            descricaovenda: adjustedData.descricaovenda,
            statusvenda: adjustedData.statusvenda,
            idprojeto: adjustedData.idprojeto,
            comercialvendacol: adjustedData.comercialvendacol,

            dtcontato: adjustedData.dtcontato,
            dtcontrato: adjustedData.dtcontrato,
            dtassinatura: adjustedData.dtassinatura,
            dtconclusao: adjustedData.dtconclusao,

            dtcriacao: adjustedData.dtcriacao,
            dtalteracao: adjustedData.dtalteracao,
            usuariocriacao: adjustedData.usuariocriacao,
            usuarioalteracao: adjustedData.usuarioalteracao,
        })

        try {
            const savedContract = await db.updateContract(req.body.idvenda, updateContract);
            res.status(200).send(savedContract);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async function (req, res) {

        try {
            const delContract = await db.deleteContract(req.params.id);
            res.status(200).send(delContract);
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = contractController
