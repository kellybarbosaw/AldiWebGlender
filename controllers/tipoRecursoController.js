const db = require("../db_Querys/db_tipoRecurso");
const {
  registerValidate,
  registerValidateUpdate,
} = require("./validates/TipoRecursoValidate");

const tipoRecursoController = {
  select: async function (req, res) {
    let offset = req.query.offset;
    let limit = req.query.limit;
    let result = [];
    let tipoRecursos = [];

    function estruturar(tipoRecursos, offset, limit) {
      let indexTipoRecursos = parseInt(offset);

      if (!offset && !limit) {
        result = tipoRecursos;
      } else {
        for (let index = 0; index < limit; index++) {

          if (tipoRecursos[indexTipoRecursos] !== undefined) {
            result.push(tipoRecursos[indexTipoRecursos])
          }
          indexTipoRecursos += 1;
        }
      }
    }

    try {
      tipoRecursos = await db.selectTipoRecursos();
      estruturar(tipoRecursos, offset, limit)
      res.setHeader('Quantidades_Registros', tipoRecursos.length);
      res.send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  selectId: async function (req, res) {
    try {
      let selectTipoRecurso = await db.selectTipoRecurso(req.params.id);
      res.status(200).send(selectTipoRecurso[0]);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  register: async function (req, res) {
    const { error } = registerValidate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const selectTipoRecurso = await db.selectTipoRecursoDescricao(req.body.descricao);

    if (selectTipoRecurso[0] !== null && selectTipoRecurso[0].length > 0) {
      return res.status(400).send({ message:"Esse tipo de recurso já existe!"});
    }

    const novoTipoRecurso = new Object({

        descricao: req.body.descricao,
        dtcriacao: req.body.dtcriacao,
        dtmodificacao: req.body.dtmodificacao,
        usuariocriacao: req.body.usuariocriacao,
        usuarioalteracao: req.body.usuarioalteracao

    });
    
    try {
      const salvarTipoRecurso = await db.insertTipoRecurso(novoTipoRecurso);
      res.status(200).send(salvarTipoRecurso);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async function (req, res) {
    const { error } = registerValidateUpdate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const selectTipoRecurso = await db.selectTipoRecursoDescricao(req.body.descricao);
    const TipoRecursoAtual = await db.selectTipoRecurso(req.body.idtipo);

    if(selectTipoRecurso[0].length >= 1){
      if(selectTipoRecurso[0][0].DESCRICAO !== TipoRecursoAtual[0][0].DESCRICAO){
        if (selectTipoRecurso[0] !== null && selectTipoRecurso[0].length >= 1 ) {
          return res.status(400).send({ message:"Esse tipo de recurso ja existe!"});
        }
      }
    }

    const updateTipoRecurso = new Object({

        descricao: req.body.descricao,
        dtcriacao: req.body.dtcriacao,
        dtmodificacao: req.body.dtmodificacao,
        usuariocriacao: req.body.usuariocriacao,
        usuarioalteracao: req.body.usuarioalteracao

    });

    try {
      const salvarTipoRecurso = await db.updateTipoRecurso(
        req.body.idtipo,
        updateTipoRecurso
      );
      res.status(200).send(salvarTipoRecurso);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async function (req, res) {
    try {
      const delTipoRecurso = await db.deleteTipoRecurso(req.params.id);
      res.status(200).send(delTipoRecurso);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = tipoRecursoController;