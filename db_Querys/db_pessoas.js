require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

//GERENCIAMENTO DE PESSOAS
async function selectZPessoas() {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM ZPESSOA;");
    return rows;
  }
  async function selectZPessoa(id) {
    const conn = await connect();
    const pessoa = await conn.query("SELECT * FROM ZPESSOA WHERE IDPESSOA =?", id);
    return pessoa;
  }
  async function selectZPessoaCpf(cpf) {
    const conn = await connect();
    const pessoa = await conn.query("SELECT * FROM ZPESSOA WHERE CPF = ?;",cpf);
    return pessoa;
  }
  async function insertZPessoa(pessoa) {
    const conn = await connect();
    const sql =
    "INSERT INTO ZPESSOA (NOME, CPF, DTNASCIMENTO, RUA, NUMERO, COMPLEMENTO, BAIRRO, NATURALIDADE, NACIONALIDADE, USUARIO, NROIDENTIDADE, ORGAOEMISSORIDENT, ESTADOEMISSORIDENT, ZUSUARIO_USUARIO, DTCRIACAO, DTALTERACAO, USUARIOCRIACAO, USUARIOALTERACAO) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    const values = [
        pessoa.nome,
        pessoa.cpf,
        pessoa.dtnascimento,
        pessoa.rua,
        pessoa.numero,
        pessoa.complemento,
        pessoa.bairro,
        pessoa.naturalidade,
        pessoa.nacionalidade,
        pessoa.usuario,
        pessoa.nroidentidade,
        pessoa.orgaoemissorident,
        pessoa.estadoemissorident,
        pessoa.zusuario_usuario,
        pessoa.dtcriacao,
        pessoa.dtalteracao,
        pessoa.usuariocriacao,
        pessoa.usuarioalteracao
    ];
    await conn.query(sql, values);
  }
  async function updateZPessoa(id, pessoa) {
    const conn = await connect();
    const sql =
    "UPDATE ZPESSOA SET NOME=?, CPF=?, DTNASCIMENTO=?, RUA=?, NUMERO=?, COMPLEMENTO=?, BAIRRO=?, NATURALIDADE=?, NACIONALIDADE=?, USUARIO=?, NROIDENTIDADE=?, ORGAOEMISSORIDENT=?, ESTADOEMISSORIDENT=?, ZUSUARIO_USUARIO=?, DTALTERACAO=?, USUARIOALTERACAO=? WHERE IDPESSOA =?;"
    const values = [
        pessoa.nome,
        pessoa.cpf,
        pessoa.dtnascimento,
        pessoa.rua,
        pessoa.numero,
        pessoa.complemento,
        pessoa.bairro,
        pessoa.naturalidade,
        pessoa.nacionalidade,
        pessoa.usuario,
        pessoa.nroidentidade,
        pessoa.orgaoemissorident,
        pessoa.estadoemissorident,
        pessoa.zusuario_usuario,
        pessoa.dtalteracao,
        pessoa.usuarioalteracao,
        id
    ];
    return await conn.query(sql, values);
  }
  async function deleteZPessoa(pessoa) {
    const conn = await connect();
    const sql = "DELETE FROM ZPESSOA WHERE IDPESSOA= ?;"
    const values = [pessoa];
    return await conn.query(sql, values);
  }
  async function selectZusuarios() {
    const conn = await connect();
    const [rows] = await conn.query("SELECT USUARIO,NOME FROM ZUSUARIO;");
    return rows;
  }


  module.exports = {selectZPessoas,selectZPessoa,selectZPessoaCpf,insertZPessoa,updateZPessoa,deleteZPessoa,selectZusuarios};