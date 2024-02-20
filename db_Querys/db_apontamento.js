
require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

//GERENCIAMENTO DE APONTAMENTO
async function selectAapontamentos(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM AAPONTAMENTO;');
    return rows;
}
async function selectAapontamento(id){
    const conn = await connect();
    const apontamento = await conn.query('SELECT * FROM AAPONTAMENTO WHERE IDAPONTAMENTO = ?',id);
    return apontamento;
}
async function insertAapontamento(apontamento){
    const conn = await connect();
    const sql = "INSERT INTO AAPONTAMENTO (IDPROJETOTAREFA, DATA, HORAINICIO, HORAFINAL, DESCRICAO, DTCRIACAO, DTMODIFICACAO, USUARIOCRIACAO, USUARIOALTERACAO)  VALUES (?,?,?,?,?,?,?,?,?);";
    const values = 
    [
        apontamento.idprojetotarefa,
        apontamento.data,
        apontamento.horainicio,
        apontamento.horafinal,
        apontamento.descricao,
        apontamento.dtcriacao,
        apontamento.dtmodificacao,
        apontamento.usuariocriacao,
        apontamento.usuarioalteracao
    ];

    await conn.query(sql,values );
}
async function updateAapontamento(id, apontamento){
    const conn = await connect();
    const sql = 'UPDATE AAPONTAMENTO SET IDPROJETOTAREFA=?, DATA=?, HORAINICIO=?, HORAFINAL=?, DESCRICAO=?, DTCRIACAO=?, DTMODIFICACAO=?, USUARIOCRIACAO=?, USUARIOALTERACAO=? WHERE IDAPONTAMENTO = ?';
    const values = [

        apontamento.idprojetotarefa,
        apontamento.data,
        apontamento.horainicio,
        apontamento.horafinal,
        apontamento.descricao,
        apontamento.dtcriacao,
        apontamento.dtmodificacao,
        apontamento.usuariocriacao,
        apontamento.usuarioalteracao,
        id
    ];

    return await conn.query(sql,values);
}
async function deleteAapontamento(apontamento){
    const conn = await connect();
    const sql = 'DELETE FROM AAPONTAMENTO WHERE IDAPONTAMENTO=?;';
    const values = [apontamento];
    return await conn.query(sql,values);
}

module.exports = {deleteAapontamento,updateAapontamento,insertAapontamento,selectAapontamento,selectAapontamentos};
