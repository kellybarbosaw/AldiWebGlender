const db = require("../db_Querys/db_tarefas");
const {
  registerValidate,
  registerValidateUpdate,
} = require("./validates/TarefaValidate");

const tarefaController = {
  select: async function (req, res) {
    let offset = req.query.offset;
    let limit = req.query.limit;
    let result = [];
    let tarefas = [];

    function estruturar(tarefas, offset, limit) {
      let indexTarefas = parseInt(offset);

      if (!offset && !limit) {
        result = tarefas;
      } else {
        for (let index = 0; index < limit; index++) {

          if (tarefas[indexTarefas] !== undefined) {
            result.push(tarefas[indexTarefas])
          }
          indexTarefas += 1;
        }
      }
    }

    try {
      tarefas = await db.selectATarefas();
      estruturar(tarefas, offset, limit)
      res.setHeader('Quantidades_Registros', tarefas.length);
      res.send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  selectId: async function (req, res) {
    try {
      let selectTarefa = await db.selectATarefa(req.params.id);
      res.status(200).send(selectTarefa[0]);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  register: async function (req, res) {
    const { error } = registerValidate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const selectTarefa = await db.selectATarefaTitulo(req.body.titulotarefa);

    if (selectTarefa[0] !== null && selectTarefa[0].length > 0) {
      return res.status(400).send({ message: "Sua tarefa já existe!"});
    }

    const novaTarefa = new Object({
      titulotarefa: req.body.titulotarefa,
      descricaotarefa: req.body.descricaotarefa,
      horasestimadas: req.body.horasestimadas,
      datacriacao: req.body.datacriacao,
      dataalteracao: req.body.dataalteracao,
      usuariocriacao: req.body.usuariocriacao,
      usuarioalteracao: req.body.usuarioalteracao,
      status: req.body.status,
    });
    
    try {
      const salvarTarefa = await db.insertATarefa(novaTarefa);
      res.status(200).send(salvarTarefa);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async function (req, res) {
    const { error } = registerValidateUpdate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const selectTarefa = await db.selectATarefaTitulo(req.body.titulotarefa);
    const TarefaAtual = await db.selectATarefa(req.body.idtarefa);

    if(selectTarefa[0].length >= 1){
      if(selectTarefa[0][0].TITULOTAREFA !== TarefaAtual[0][0].TITULOTAREFA){
        if (selectTarefa[0] !== null && selectTarefa[0].length >= 1 ) {
          return res.status(400).send({ message:"Essa tarefa ja existe!"});
        }
      }
    }

    const updateTarefa = new Object({
      titulotarefa: req.body.titulotarefa,
      descricaotarefa: req.body.descricaotarefa,
      horasestimadas: req.body.horasestimadas,
      datacriacao: req.body.datacriacao,
      dataalteracao: req.body.dataalteracao,
      usuariocriacao: req.body.usuariocriacao,
      usuarioalteracao: req.body.usuarioalteracao,
      status: req.body.status,
    });

    try {
      const salvarTarefa = await db.updateATarefa(
        req.body.idtarefa,
        updateTarefa
      );
      res.status(200).send(salvarTarefa);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async function (req, res) {
    try {
      const delTarefa = await db.deleteATarefa(req.params.id);
      res.status(200).send(delTarefa);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = tarefaController;