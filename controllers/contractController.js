const db = require('../bd');
const {regiterValidate,regiterValidateUpdate} = require('./validates/ContractValidate');


const contractController = {
    select: async function (req,res){

        let contract = [];
        try {
            contract = await db.selectContracts();
            res.send(contract);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectId: async function (req,res){
        try {
            let selectContracts = await db.selectContractID(req.params.id);
            res.status(200).send(selectContracts[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectContractsClient: async function (req,res){
        try {
            let selectContracts = await db.selectContractClient(req.params.id);
            res.status(200).send(selectContracts);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    register: async function (req,res){


        const {error} = regiterValidate(req.body)
        if(error){return res.status(400).send(error.message)};
        

        const newContract = new Object ({
            idcliente: req.body.idcliente,
            descricaovenda: req.body.descricaovenda,
            statusvenda: req.body.statusvenda,
            idprojeto: req.body.idprojeto,
            comercialvendacol: req.body.comercialvendacol,
    
            dtcontato: req.body.dtcontato,
            dtcontrato:req.body.dtcontrato,
            dtassinatura: req.body.dtassinatura,
            dtconclusao: req.body.dtconclusao,
            dtcriacao: req.body.dtcriacao,
            dtalteracao: req.body.dtalteracao,
    
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
        })

        try {
            const savedContract = await db.insertContract(newContract);
            res.status(200).send(savedContract);
        } catch (error) {
            res.status(400).send(error)
        }

    },

    update: async function (req,res){
        
        const {error} = regiterValidateUpdate(req.body)
        if(error){return res.status(400).send(error.message)};
   
        const updateContract = new Object ({
            idcliente: req.body.idcliente,
            descricaovenda: req.body.descricaovenda,
            statusvenda: req.body.statusvenda,
            idprojeto: req.body.idprojeto,
            comercialvendacol: req.body.comercialvendacol,
    
            dtcontato: req.body.dtcontato,
            dtcontrato:req.body.dtcontrato,
            dtassinatura: req.body.dtassinatura,
            dtconclusao: req.body.dtconclusao,
            dtcriacao: req.body.dtcriacao,
            dtalteracao: req.body.dtalteracao,
    
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
        })

        try {
            const savedContract = await db.updateContract(req.body.idvenda,updateContract);
            res.status(200).send(savedContract);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async function (req,res){

        try {
            const delContract = await db.deleteContract(req.params.id);
            res.status(200).send(delContract);
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = contractController
