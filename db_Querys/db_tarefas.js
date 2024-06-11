require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

//GERENCIAMENTO DE TAREFAS
async function selectATarefas() {
    const conn = await connect();
    const [rows] = await conn.query(
      "SELECT IDTAREFA, TITULOTAREFA, DESCRICAOTAREFA, HORASESTIMADAS, DATE_FORMAT(DATACRIACAO,'%Y/%m/%d') as DATACRIACAO, DATE_FORMAT(DATAALTERACAO,'%Y/%m/%d') as DATAALTERACAO , USUARIOCRIACAO, USUARIOALTERACAO, STATUS FROM ATAREFA;"
    );
    return rows;
  }
  async function selectATarefa(id) {
    const conn = await connect();
    const tarefa = await conn.query(
      "SELECT IDTAREFA, TITULOTAREFA, DESCRICAOTAREFA, HORASESTIMADAS, DATE_FORMAT(DATACRIACAO,'%Y/%m/%d') as DATACRIACAO, DATE_FORMAT(DATAALTERACAO,'%Y/%m/%d') as DATAALTERACAO , USUARIOCRIACAO, USUARIOALTERACAO, STATUS FROM ATAREFA WHERE IDTAREFA =?",
      id
    );
    return tarefa;
  }
  async function selectATarefaTitulo(titulo) {
    const conn = await connect();
    const tarefa = await conn.query(
      "SELECT * FROM ATAREFA WHERE TITULOTAREFA = ?",
      titulo
    );
    return tarefa;
  }
  async function insertATarefa(tarefa) {
    const conn = await connect();
    const sql =
      "INSERT INTO ATAREFA (TITULOTAREFA, DESCRICAOTAREFA, HORASESTIMADAS, DATACRIACAO, DATAALTERACAO, USUARIOCRIACAO, USUARIOALTERACAO, STATUS) VALUES (?,?,?,?,?,?,?,?);";
    const values = [
      tarefa.titulotarefa,
      tarefa.descricaotarefa,
      tarefa.horasestimadas,
      tarefa.datacriacao,
      tarefa.dataalteracao,
      tarefa.usuariocriacao,
      tarefa.usuarioalteracao,
      tarefa.status,
    ];
    await conn.query(sql, values);
  }
  async function updateATarefa(id, tarefa) {
    const conn = await connect();
    const sql =
      "UPDATE ATAREFA SET TITULOTAREFA= ?, DESCRICAOTAREFA= ?, HORASESTIMADAS= ?, DATAALTERACAO= ?, USUARIOALTERACAO= ?, STATUS=? WHERE IDTAREFA= ?";
    const values = [
      tarefa.titulotarefa,
      tarefa.descricaotarefa,
      tarefa.horasestimadas,
      tarefa.dataalteracao,
      tarefa.usuarioalteracao,
      tarefa.status,
      id,
    ];
    return await conn.query(sql, values);
  }
  async function deleteATarefa(id) {
    const conn = await connect();
    const sql = "DELETE FROM ATAREFA WHERE IDTAREFA=?;";
    const values = [id];
    return await conn.query(sql, values);
  }

  module.exports = {selectATarefas,selectATarefa,selectATarefaTitulo,insertATarefa,updateATarefa,deleteATarefa};