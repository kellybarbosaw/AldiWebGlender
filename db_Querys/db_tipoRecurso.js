require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

//GERENCIAMENTO DE RECURSO
async function selectTipoRecursos(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM TIPORECURSO;');
    return rows;
}
async function selectTipoRecurso(id){
    const conn = await connect();
    const tipoRecurso = await conn.query('SELECT * FROM TIPORECURSO WHERE IDTIPO = ?',id);
    return tipoRecurso;
}
async function selectTipoRecursoDescricao(descricao) {
    const conn = await connect();
    const tipoRecurso = await conn.query(
      "SELECT * FROM TIPORECURSO WHERE DESCRICAO = ?",
      descricao
    );
    return tipoRecurso;
  }
async function insertTipoRecurso(tipoRecurso){
    const conn = await connect(); 
    const sql = "INSERT INTO TIPORECURSO (DESCRICAO, DTCRIACAO, DTMODIFICACAO, USUARIOCRIACAO, USUARIOALTERACAO)  VALUES (?,?,?,?,?,?);";
    const values = 
    [
        tipoRecurso.descricao,
        tipoRecurso.dtcriacao,
        tipoRecurso.dtmodificacao,
        tipoRecurso.usuariocriacao,
        tipoRecurso.usuarioalteracao
    ];

    await conn.query(sql,values );
}
async function updateTipoRecurso(id, tipoRecurso){
    const conn = await connect();
    const sql = 'UPDATE TIPORECURSO SET DESCRICAO=?, DTCRIACAO=?, DTMODIFICACAO=?, USUARIOCRIACAO=?, USUARIOALTERACAO=? WHERE = IDTIPO=?;';
    const values = [

        tipoRecurso.descricao,
        tipoRecurso.dtcriacao,
        tipoRecurso.dtmodificacao,
        tipoRecurso.usuariocriacao,
        tipoRecurso.usuarioalteracao,
        id
    ];

    return await conn.query(sql,values);
}
async function deleteTipoRecurso(tipoRecurso){
    const conn = await connect();
    const sql = 'DELETE FROM TIPORECURSO WHERE IDTIPO=?;';
    const values = [tipoRecurso];
    return await conn.query(sql,values);
}

module.exports = {selectTipoRecursos, selectTipoRecurso, selectTipoRecursoDescricao, insertTipoRecurso, updateTipoRecurso, deleteTipoRecurso};