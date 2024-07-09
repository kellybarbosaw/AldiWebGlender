const db = require("../db_Querys/db_projetoTarefa");
const {
  registerValidate,
  registerValidateUpdate,
} = require("./validates/ProjetoTarefaValidate");

const projetoTarefaController = {
  select: async function (req, res) {
    let projetoTarefa = [];
    try {
      projetoTarefa = await db.selectAProjetoTarefas();
      res.send(projetoTarefa);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  selectId: async function (req, res) {
    try {
      let selectProjetoTarefa = await db.selectAProjetoTarefa(req.params.id);
      res.status(200).send(selectProjetoTarefa[0]);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  selectIdClient: async function (req, res) {
    try {
      let selectProjetoTarefa = await db.selectAProjetoTarefaWithClient(req.params.id);
      res.status(200).send(selectProjetoTarefa[0]);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  register: async function (req, res) {
    const { error } = registerValidate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const selectProjetoTarefa = await db.selectAProjetoTarefaTitulo(req.body.titulotarefa);

    if (selectProjetoTarefa[0] !== null && selectProjetoTarefa[0].length > 0) {
      return res.status(400).send("Essa tarefa já existe");
    }

    const novoProjetoTarefa = new Object({
      idprojeto: req.body.idprojeto,
      idtarefa: req.body.idtarefa,
      titulotarefa: req.body.titulotarefa,
      descricaotarefa: req.body.descricaotarefa,
      datainicioprevista: req.body.datainicioprevista,
      datafimprevista: req.body.datafimprevista,
      dtcriacao: req.body.dtcriacao,
      dtalteracao: req.body.dtalteracao,
      usuariocriacao: req.body.usuariocriacao,
      usuarioalteracao: req.body.usuarioalteracao,
      statustarefa: req.body.statustarefa,
      horasestimadas: req.body.horasestimadas,
      horasgastas: req.body.horasgastas,
      saldohoras: req.body.saldohoras,
      etapa: req.body.etapa
    });
    try {
      const savedProjetoTarefa = await db.insertAProjetoTarefa(novoProjetoTarefa);
      res.status(200).send(savedProjetoTarefa);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async function (req, res) {
    const { error } = registerValidateUpdate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const selectProjetoTarefa = await db.selectAProjetoTarefaTitulo(req.body.titulotarefa);

    if (selectProjetoTarefa[0] !== null && selectProjetoTarefa[0].length > 1) {
      return res.status(400).send("Essa tarefa projeto já existe");
    }

    const updateProjetoTarefa = new Object({

      idprojeto: req.body.idprojeto,
      idtarefa: req.body.idtarefa,
      titulotarefa: req.body.titulotarefa,
      descricaotarefa: req.body.descricaotarefa,
      datainicioprevista: req.body.datainicioprevista,
      datafimprevista: req.body.datafimprevista,
      dtcriacao: req.body.dtcriacao,
      dtalteracao: req.body.dtalteracao,
      usuariocriacao: req.body.usuariocriacao,
      usuarioalteracao: req.body.usuarioalteracao,
      statustarefa: req.body.statustarefa,
      horasestimadas: req.body.horasestimadas,
      horasgastas: req.body.horasgastas,
      saldohoras: req.body.saldohoras,
      etapa: req.body.etapa
      
    });

    try {
      const salvarProjetoTarefa = await db.updateAProjetoTarefa(
        req.body.idprojetotarefa,
        updateProjetoTarefa
      );
      res.status(200).send(salvarProjetoTarefa);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  updateEtapa: async function (req, res) {
    try {
      const salvarProjetoTarefa = await db.updateAProjetoTarefaEtapa(req.params.id,req.body.etapa);
      res.status(200).send(salvarProjetoTarefa);
    } catch (error) {
      res.status(400).send(error);
    }

  },

  delete: async function (req, res) {
    try {
      const deleteProjetoTarefa = await db.deleteAProjetoTarefa(req.params.id);
      res.status(200).send(deleteProjetoTarefa);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  selectAProjetoTarefaWithIdProjeto:async function (req, res) {
    try {
      let selectProjetoTarefas = await db.selectAProjetoTarefaWithIdProjeto(req.params.id);
      res.status(200).send(selectProjetoTarefas[0]);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  selectTarefa: async function (req, res) {
    let tarefas = [];
    try {
        tarefas = await db.selectTarefa();
        res.send(tarefas);
    } catch (error) {
        res.status(400).send(error);
    }
},

selectProjeto: async function (req, res) {
  let projetos = [];
  try {
    projetos = await db.selectProjeto();
      res.send(projetos);
  } catch (error) {
      res.status(400).send(error);
  }
},
};

module.exports = projetoTarefaController;