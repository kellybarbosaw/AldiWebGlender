const db = require('../db_Querys/db_agenda');
const {registerValidate,registerValidateUpdate} = require('./validates/AgendaValidate');


const agendaController = {
    select: async function (req,res){

        let agenda = [];
        try {
            agenda = await db.selectAagendas();
            res.send(agenda);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectId: async function (req,res){
        try {
            let selectAgenda = await db.selectAgenda(req.params.id);
            res.status(200).send(selectAgenda[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },
    selectByUsuarioCriacao: async function (req, res) {
        const usuariocriacao = req.query.usuariocriacao; // Pegando o parâmetro da query string
        console.log('Usuário de criação recebido:', usuariocriacao); // Adicione este log
        if (!usuariocriacao) {
            return res.status(400).send('O parâmetro "usuariocriacao" é obrigatório.'); // Validando o parâmetro
        }
    
        try {
            const agendas = await db.selectAgendasByUsuarioCriacao(usuariocriacao); // Chama o método que consulta o BD
            res.status(200).json(agendas); // Retorna as agendas encontradas
        } catch (error) {
            console.error('Erro ao buscar agendas:', error);
            res.status(500).send('Erro ao buscar agendas no servidor.');
        }
    },
    
    

    register: async function (req,res){

        const {error} = registerValidate(req.body)
        if(error){return res.status(400).send(error.message)};

        const newAgenda = new Object ({
            idagenda: req.body.idagenda,
            atividade: req.body.atividade,
            horainicio: req.body.horainicio,
            horafinal: req.body.horafinal,
            horaalmoco: req.body.horaalmoco,
            horaprevista: req.body.horaprevista,
            horarealizada: req.body.horarealizada,
            data: req.body.data,
            empresaTrabalhada: req.body.empresaTrabalhada,
            status: req.body.status,
            usuariocriacao: req.body.usuariocriacao,
        })

        try {
            const savedAgenda = await db.insertAagenda(newAgenda);
            res.status(200).send(savedAgenda);
        } catch (error) {
            res.status(400).send(error)
        }

    },

    update: async function (req,res){
        
        const {error} = registerValidateUpdate(req.body)
        if(error){return res.status(400).send(error.message)};

        //const selectAgenda = await db.selectATarefaStatus(req.body.idagenda);
        
        // if(selectAgenda[0] !== null && selectAgenda[0].length > 1){
        //     return res.status(400).send('Título already exists');
        // }     

        const UpdateAgenda = new Object ({
            idagenda: req.body.idagenda,
            atividade: req.body.atividade,
            horainicio: req.body.horainicio,
            horafinal: req.body.horafinal,
            horaalmoco: req.body.horaalmoco,
            horaprevista: req.body.horaprevista,
            horarealizada: req.body.horarealizada,
            data: req.body.data,
            empresaTrabalhada: req.body.empresaTrabalhada,
            status: req.body.status,
        })

        try {
            const savedAgenda = await db.updateAagenda(req.body.idagenda,UpdateAgenda);
            res.status(200).send(savedAgenda);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async function (req,res){

        try {
            const delAgenda = await db.deleteAagenda(req.params.id);
            res.status(200).send(delAgenda);
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = agendaController;