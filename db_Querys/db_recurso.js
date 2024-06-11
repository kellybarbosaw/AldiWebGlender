require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

//GERENCIAMENTO DE RECURSO
async function selectZRecursos(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT zrecursos.*, tiporecurso.DESCRICAO, zpessoa.NOME FROM zrecursos INNER JOIN tiporecurso ON zrecursos.TIPORECURSO = TIPORECURSO.IDTIPO INNER JOIN zpessoa ON zpessoa.IDPESSOA = zrecursos.IDPESSOA');
    return rows;
}
async function selectZRecurso(id){
    const conn = await connect();
    const recurso = await conn.query('SELECT *, P.NOME AS NOMEPESSOA FROM ZRECURSOS R INNER JOIN ZPESSOA P ON R.IDPESSOA = P.IDPESSOA  WHERE IDRECURSO = ?',id);
    return recurso;
}
async function selectZRecursoTipo(tipo, idpessoa){
    const conn = await connect();
    const client = await conn.query('SELECT * FROM ZRECURSOS WHERE TIPORECURSO = ? AND IDPESSOA = ?',[tipo,idpessoa]);
    return client;
}
async function insertZRecurso(recurso){
    const conn = await connect(); //IDPESSOA
    const sql = "INSERT INTO ZRECURSOS (IDPESSOA, TIPORECURSO, DATAINICIO, DATAFIM, DATACRIACAO, DATAALTERACAO, USUARIOCRIACAO, USUARIOALTERACAO, ATIVO, VALORHR)  VALUES (?,?,?,?,?,?,?,?,?,?);";
    const values = 
    [
        recurso.idpessoa,
        recurso.tiporecurso,
        recurso.datainicio,
        recurso.datafim,
        recurso.datacriacao,
        recurso.dataalteracao,
        recurso.usuariocriacao,
        recurso.usuarioalteracao,
        recurso.ativo,
        recurso.valorhr
    ];

    await conn.query(sql,values );
}
async function updateZRecurso(id, recurso){
    const conn = await connect();
    const sql = 'UPDATE ZRECURSOS SET IDPESSOA=?, TIPORECURSO=?, DATAINICIO=?, DATAFIM=?, DATACRIACAO=?, DATAALTERACAO=?, USUARIOCRIACAO=?, USUARIOALTERACAO=?, ATIVO=?, VALORHR=?, WHERE IDRECURSO = ?';
    const values = [

        recurso.idpessoa,
        recurso.tiporecurso,
        recurso.datainicio,
        recurso.datafim,
        recurso.datacriacao,
        recurso.dataalteracao,
        recurso.usuariocriacao,
        recurso.usuarioalteracao,
        recurso.ativo,
        recurso.valorhr,
        id
    ];

    return await conn.query(sql,values);
}
async function deleteZRecurso(recurso){
    const conn = await connect();
    const sql = 'DELETE FROM ZRECURSOS WHERE IDRECURSO=?;';
    const values = [recurso];
    return await conn.query(sql,values);
}
async function selectZpessoas() {
    const conn = await connect();
    const [rows] = await conn.query("SELECT IDPESSOA, NOME FROM ZPESSOA;");
    return rows;
}
async function selectTipoRecurso() {
    const conn = await connect();
    const [rows] = await conn.query("SELECT IDTIPO, DESCRICAO FROM TIPORECURSO;");
    return rows;
}

module.exports = {selectTipoRecurso, selectZpessoas,updateZRecurso,deleteZRecurso,insertZRecurso,selectZRecursoTipo,selectZRecursos,selectZRecurso};