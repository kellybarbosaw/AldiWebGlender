const db = require('../db_Querys/db_clients');
const { registerValidate, registerValidateUpdate } = require('./validates/ClientValidate');




const clientController = {
    select: async function (req, res) {
        let clients = [];
        try {
            clients = await db.selectZClientes();
            res.send(clients);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectId: async function (req, res) {
        try {
            let selectClient = await db.selectZClienteID(req.params.id);
            res.status(200).send(selectClient[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    register: async function (req, res) {


        const { error } = registerValidate(req.body)
        if (error) { return res.status(400).send(error.message) };

        const selectClient = await db.selectZCliente(req.body.cgccfo);


        if (selectClient[0] !== null && selectClient[0].length > 0) {
            return res.status(400).send({'msg':'CNPJ already exists'});
        }

        const newClient = new Object({
            nomefantasia: req.body.nomefantasia,
            nome: req.body.nome,
            cgccfo: req.body.cgccfo,
            inscrestadual: req.body.inscrestadual,
            pagrec: req.body.pagrec,
            rua: req.body.rua,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            codetd: req.body.codetd,
            cep: req.body.cep,
            telefone: req.body.telefone,

            ruapgto: req.body.ruapgto,
            numeropgto: req.body.numeropgto,
            complementopgto: req.body.complementopgto,
            bairropgto: req.body.bairropgto,
            cidadepgto: req.body.cidadepgto,
            codetdpgto: req.body.codetdpgto,
            ceppgto: req.body.ceppgto,
            telefonepgto: req.body.telefonepgto,

            ruaentrega: req.body.ruaentrega,
            numeroentrega: req.body.numeroentrega,
            complementoentrega: req.body.complementoentrega,
            bairroentrega: req.body.bairroentrega,
            cidadeentrega: req.body.cidadeentrega,
            codetdentrega: req.body.codetdentrega,
            cepentrega: req.body.cepentrega,
            telefoneentrega: req.body.telefoneentrega,

            email: req.body.email,
            ativo: req.body.ativo,
            inscrmunicipal: req.body.inscrmunicipal,
            pessoafisoujur: req.body.pessoafisoujur,
            pais: req.body.pais,
            paispgto: req.body.paispgto,
            paisentrega: req.body.paisentrega,
            emailentrega: req.body.emailentrega,
            emailpgto: req.body.emailpgto,

            codmunicipiopgto: req.body.codmunicipiopgto,
            codmunicipioentrega: req.body.codmunicipioentrega,
            dtcriacao: req.body.dtcriacao,
            dtmodificacao: req.body.dtmodificacao,
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
            tipocliente: req.body.tipocliente
        })


        try {
            const savedClient = await db.insertZCliente(newClient);
            res.status(200).send(savedClient);
        } catch (error) {
            res.status(400).send(error)
        }

    },

    update: async function (req, res) {

        const { error } = registerValidateUpdate(req.body)
        if (error) { return res.status(400).send(error.message) };

        const selectClient = await db.selectZCliente(req.body.cgccfo);

        if (selectClient[0] !== null && selectClient[0].length > 1) {
            return res.status(400).send({'msg':'CNPJ already exists'});
        }

        const UpdateClient = new Object({
            nomefantasia: req.body.nomefantasia,
            nome: req.body.nome,
            cgccfo: req.body.cgccfo,
            inscrestadual: req.body.inscrestadual,
            pagrec: req.body.pagrec,
            rua: req.body.rua,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            codetd: req.body.codetd,
            cep: req.body.cep,
            telefone: req.body.telefone,

            ruapgto: req.body.ruapgto,
            numeropgto: req.body.numeropgto,
            complementopgto: req.body.complementopgto,
            bairropgto: req.body.bairropgto,
            cidadepgto: req.body.cidadepgto,
            codetdpgto: req.body.codetdpgto,
            ceppgto: req.body.ceppgto,
            telefonepgto: req.body.telefonepgto,

            ruaentrega: req.body.ruaentrega,
            numeroentrega: req.body.numeroentrega,
            complementoentrega: req.body.complementoentrega,
            bairroentrega: req.body.bairroentrega,
            cidadeentrega: req.body.cidadeentrega,
            codetdentrega: req.body.codetdentrega,
            cepentrega: req.body.cepentrega,
            telefoneentrega: req.body.telefoneentrega,

            email: req.body.email,
            ativo: req.body.ativo,
            inscrmunicipal: req.body.inscrmunicipal,
            pessoafisoujur: req.body.pessoafisoujur,
            pais: req.body.pais,
            paispgto: req.body.paispgto,
            paisentrega: req.body.paisentrega,
            emailentrega: req.body.emailentrega,
            emailpgto: req.body.emailpgto,

            codmunicipiopgto: req.body.codmunicipiopgto,
            codmunicipioentrega: req.body.codmunicipioentrega,
            dtmodificacao: req.body.dtmodificacao,
            usuarioalteracao: req.body.usuarioalteracao,
            tipocliente: req.body.tipocliente
        })

        try {
            const savedClient = await db.updateZCliente(req.body.idcliente, UpdateClient);
            res.status(200).send(savedClient);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async function (req, res) {

        try {
            const delClient = await db.deleteZCliente(req.params.id);
            res.status(200).send(delClient);
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = clientController





