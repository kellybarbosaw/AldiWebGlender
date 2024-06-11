require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

  //GERENCIAMENTO DE PROJETO TAREFA
  async function selectAProjetoTarefas() {
    const conn = await connect();
    const [rows] = await conn.query(
      "SELECT * FROM APROJETOTAREFA;");
    return rows;
  }
  async function selectAProjetoTarefa(id) {
    const conn = await connect();
    const projetoTarefa = await conn.query(
      "SELECT * FROM APROJETOTAREFA WHERE IDPROJETOTAREFA = ?",
      id
    );
    return projetoTarefa;
  
  }
  async function selectAProjetoTarefaWithIdProjeto(idprojeto) {
    const conn = await connect();
    const projetoTarefa = await conn.query(
      "SELECT * FROM APROJETOTAREFA WHERE IDPROJETO = ?;",
      idprojeto
    );
    return projetoTarefa;
  }
  async function selectAProjetoTarefaTitulo(titulotarefa) {
    const conn = await connect();
    const projetoTarefa = await conn.query(
      "SELECT * FROM APROJETOTAREFA WHERE TITULOTAREFA = ?;",
      titulotarefa
    );
    return projetoTarefa;
  }
  async function insertAProjetoTarefa(projetoTarefa) {
    const conn = await connect(); //IDPESSOA
    const sql =
      "INSERT INTO APROJETOTAREFA (IDPROJETO, IDTAREFA, TITULOTAREFA, DESCRICAOTAREFA, DATAINICIOPREVISTA, DATAFIMPREVISTA, DTCRIACAO, DTALTERACAO, USUARIOCRIACAO, USUARIOALTERACAO, HORASESTIMADAS, HORASGASTAS, SALDOHORAS, ETAPA)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    const values = [
      projetoTarefa.idprojeto,
      projetoTarefa.idtarefa,
      projetoTarefa.titulotarefa,
      projetoTarefa.descricaotarefa,
      projetoTarefa.datainicioprevista,
      projetoTarefa.datafimprevista,
      projetoTarefa.dtcriacao,
      projetoTarefa.dtalteracao,
      projetoTarefa.usuariocriacao,
      projetoTarefa.usuarioalteracao,
      //projetoTarefa.statustarefa,
      projetoTarefa.horasestimadas,
      projetoTarefa.horasgastas,
      projetoTarefa.saldohoras,
      projetoTarefa.etapa
    ];
  
    await conn.query(sql, values);
  }
  async function updateAProjetoTarefa(id, projetoTarefa) {
    const conn = await connect();
    const sql =
      "UPDATE APROJETOTAREFA SET IDPROJETO=?, IDTAREFA=?, TITULOTAREFA=?, DESCRICAOTAREFA=?, DATAINICIOPREVISTA=?, DATAFIMPREVISTA=?, DTCRIACAO=?, DTALTERACAO=?, USUARIOCRIACAO=?, USUARIOALTERACAO=?, HORASESTIMADAS=?, HORASGASTAS=?, SALDOHORAS=?, ETAPA=? WHERE IDPROJETOTAREFA= ?;"
    const values = [
      projetoTarefa.idprojeto,
      projetoTarefa.idtarefa,
      projetoTarefa.titulotarefa,
      projetoTarefa.descricaotarefa,
      projetoTarefa.datainicioprevista,
      projetoTarefa.datafimprevista,
      projetoTarefa.dtcriacao,
      projetoTarefa.dtalteracao,
      projetoTarefa.usuariocriacao,
      projetoTarefa.usuarioalteracao,
      //projetoTarefa.statustarefa,
      projetoTarefa.horasestimadas,
      projetoTarefa.horasgastas,
      projetoTarefa.saldohoras,
      projetoTarefa.etapa,
      id
    ];
    return await conn.query(sql, values); 
  }
  async function deleteAProjetoTarefa(projetoTarefa) {
    const conn = await connect();
    const sql = "DELETE FROM APROJETOTAREFA WHERE IDPROJETOTAREFA=?;";
    const values = [projetoTarefa];
    return await conn.query(sql, values);
  }
  async function selectTarefa(){
    const conn = await connect();
    const [rows] = await conn.query("SELECT TITULOTAREFA FROM ATAREFA;");
    return rows;
}
  async function selectProjeto(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT TITULO FROM APROJETO;');
    return rows;
}

  module.exports = {selectProjeto,selectTarefa,selectAProjetoTarefas,selectAProjetoTarefa,insertAProjetoTarefa,updateAProjetoTarefa,deleteAProjetoTarefa,selectAProjetoTarefaTitulo,selectAProjetoTarefaWithIdProjeto};