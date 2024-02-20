require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

//GERENCIAMENTO DE RECURSO
async function selectZRecursos(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM ZRECURSOS;');
    return rows;
}
async function selectZRecurso(id){
    const conn = await connect();
    const recurso = await conn.query('SELECT * FROM ZRECURSOS WHERE IDRECURSO = ?',id);
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
    const sql = 'UPDATE ZRECURSOS SET IDPESSOA=?, TIPORECURSO=?, DATAINICIO=?, DATAFIM=?, DATACRIACAO=?, DATAALTERACAO=?, USUARIOCRIACAO=?, USUARIOALTERACAO=?, ATIVO=?, VALORHR=? WHERE IDRECURSO = ?';
    const values = [

        recurso.idpessoa,
        recurso.tiporecurso,
        recurso.datainicio.format('dd/MM/yyyy'),
        recurso.datafim.format('dd/MM/yyyy'),
        recurso.datacriacao.format('dd/MM/yyyy'),
        recurso.dataalteracao.format('dd/MM/yyyy'),
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

module.exports = {updateZRecurso,deleteZRecurso,insertZRecurso,selectZRecursoTipo,selectZRecursos,selectZRecurso};