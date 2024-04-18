const db = require("../db_Querys/db_pessoas");
const {
  registerValidate,
  registerValidateUpdate,
} = require("./validates/PessoaValidate");

const pessoaController = {
  select: async function (req, res) {
    let offset = req.query.offset;
    let limit = req.query.limit;
    let result = [];
    let pessoas = [];

    function estruturar(pessoas, offset, limit) {
      let indexPessoa = parseInt(offset);

      if (!offset && !limit) {
        result = pessoas;
      } else {
        for (let index = 0; index < limit; index++) {

          if (pessoas[indexPessoa] !== undefined) {
            result.push(pessoas[indexPessoa])
          }
          indexPessoa += 1;
        }
      }
    }
    try {
      pessoas = await db.selectZPessoas();
      estruturar(pessoas, offset, limit)
      res.setHeader('Quantidades_Registros', pessoas.length);
      res.send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  selectId: async function (req, res) {
    try {
      let selectPessoa = await db.selectZPessoa(req.params.id);
      res.status(200).send(selectPessoa[0]);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  register: async function (req, res) {

    const { error } = registerValidate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const selectPessoa = await db.selectZPessoaCpf(req.body.cpf);

    if (selectPessoa[0] !== null && selectPessoa[0].length > 0) {
      return res.status(400).send({ message:"Essa pessoa já existe!"});
    }

    const novaPessoa = new Object({
      nome: req.body.nome,
      cpf: req.body.cpf,
      dtnascimento: req.body.dtnascimento,
      rua: req.body.rua,
      numero: req.body.numero,
      complemento: req.body.complemento,
      bairro: req.body.bairro,
      naturalidade: req.body.naturalidade,
      nacionalidade: req.body.nacionalidade,
      usuario: req.body.usuario,
      nroidentidade: req.body.nroidentidade,
      orgaoemissorident: req.body.orgaoemissorident,
      estadoemissorident: req.body.estadoemissorident,
      zusuario_usuario: req.body.zusuario_usuario,
      dtcriacao: req.body.dtcriacao,
      dtalteracao: req.body.dtalteracao,
      usuariocriacao: req.body.usuariocriacao,
      usuarioalteracao: req.body.usuarioalteracao
    });
    try {
      const salvarPessoa = await db.insertZPessoa(novaPessoa);
      res.status(200).send(salvarPessoa);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async function (req, res) {
    const { error } = registerValidateUpdate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const selectPessoa = await db.selectZPessoaCpf(req.body.cpf);
    const pessoaAtual = await db.selectZPessoa(req.body.idpessoa);

    if(selectPessoa[0].length >= 1){
      if(selectPessoa[0][0].CPF !== pessoaAtual[0][0].CPF){
        if (selectPessoa[0] !== null && selectPessoa[0].length >= 1 ) {
          return res.status(400).send({ message:"Esse CPF Já está Cadastrado!"});
        }
      }
    }


    const updatePessoa = new Object({

      nome: req.body.nome,
      cpf: req.body.cpf,
      dtnascimento: req.body.dtnascimento,
      rua: req.body.rua,
      numero: req.body.numero,
      complemento: req.body.complemento,
      bairro: req.body.bairro,
      naturalidade: req.body.naturalidade,
      nacionalidade: req.body.nacionalidade,
      usuario: req.body.usuario,
      nroidentidade: req.body.nroidentidade,
      orgaoemissorident: req.body.orgaoemissorident,
      estadoemissorident: req.body.estadoemissorident,
      zusuario_usuario: req.body.zusuario_usuario,
      dtalteracao: req.body.dtalteracao,
      usuarioalteracao: req.body.usuarioalteracao

    });

    try {
      const salvarPessoa = await db.updateZPessoa(
        req.body.idpessoa,
        updatePessoa
      );
      res.status(200).send(salvarPessoa);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async function (req, res) {
    try {
      const delPessoa = await db.deleteZPessoa(req.params.id);
      res.status(200).send(delPessoa);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  selectZusuarios: async function (req, res) {
    let usuarios = [];
    try {
      usuarios = await db.selectZusuarios();
      res.send(usuarios);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = pessoaController;