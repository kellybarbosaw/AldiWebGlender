const db = require('../bd');
const {regiterValidate,regiterValidateUpdate} = require('./validates/ClientValidate');




const clientController = {
    select: async function (req,res){

        let clients = [];
        try {
            clients = await db.selectZClientes();
            res.send(clients);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectId: async function (req,res){
        try {
            let selectClient = await db.selectZClienteID(req.params.id);
            res.status(200).send(selectClient[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    register: async function (req,res){


        const {error} = regiterValidate(req.body)
        if(error){return res.status(400).send(error.message)};

        const selectClient = await db.selectZCliente(req.body.cnpj);
        

        if(selectClient[0] !== null && selectClient[0].length > 0){
            return res.status(400).send('CNPJ already exists');
        }     

        const newClient = new Object ({
            cnpj: req.body.cnpj,
            nome: req.body.nome,
            nomefantasia: req.body.nomefantasia,
            inscrestadual: req.body.inscrestadual,
            inscrmunicipal: req.body.inscrmunicipal,
    
            telefone: req.body.telefone,
            celular: req.body.celular,
            email: req.body.email,
            rua: req.body.rua,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            pais: req.body.pais,
            cep: req.body.cep,
    
            respcomercial: req.body.respcomercial,
            telcomercial: req.body.telcomercial,
            celcomercial: req.body.celcomercial,
            emailcomercial: req.body.emailcomercial,
    
            respfinanceiro: req.body.respfinanceiro,
            telfinanceiro: req.body.telfinanceiro,
            celfinanceiro: req.body.celfinanceiro,
            emailfinanceiro: req.body.emailfinanceiro
        })

        try {
            const savedClient = await db.insertZCliente(newClient);
            res.status(200).send(savedClient);
        } catch (error) {
            res.status(400).send(error)
        }

    },

    update: async function (req,res){
        
        const {error} = regiterValidateUpdate(req.body)
        if(error){return res.status(400).send(error.message)};

        const selectClient = await db.selectZCliente(req.body.cnpj);
        
        if(selectClient[0] !== null && selectClient[0].length > 1){
            return res.status(400).send('CNPJ already exists');
        }     

        const UpdateClient = new Object ({
            cnpj: req.body.cnpj,
            nome: req.body.nome,
            nomefantasia: req.body.nomefantasia,
            inscrestadual: req.body.inscrestadual,
            inscrmunicipal: req.body.inscrmunicipal,
    
            telefone: req.body.telefone,
            celular: req.body.celular,
            email: req.body.email,
            rua: req.body.rua,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            pais: req.body.pais,
            cep: req.body.cep,
    
            respcomercial: req.body.respcomercial,
            telcomercial: req.body.telcomercial,
            celcomercial: req.body.celcomercial,
            emailcomercial: req.body.emailcomercial,
    
            respfinanceiro: req.body.respfinanceiro,
            telfinanceiro: req.body.telfinanceiro,
            celfinanceiro: req.body.celfinanceiro,
            emailfinanceiro: req.body.emailfinanceiro
        })

        try {
            const savedClient = await db.updateZCliente(req.body.idclient,UpdateClient);
            res.status(200).send(savedClient);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async function (req,res){

        try {
            const delClient = await db.deleteZCliente(req.params.id);
            res.status(200).send(delClient);
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = clientController





