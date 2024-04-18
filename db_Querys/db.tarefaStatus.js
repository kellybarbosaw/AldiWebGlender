require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

// GERENCIAMENTO DE TAREFA STATUS
async function selectATarefasStatus(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM ATAREFASTATUS;');
    return rows;
}
async function selectATarefaStatus(id){
    const conn = await connect();
    const tarefaStatus = await conn.query('SELECT * FROM ATAREFASTATUS WHERE IDSTATUS = ?',id);
    return tarefaStatus;
}
async function insertATarefaStatus(tarefaStatus){
    const conn = await connect();
    const sql = "INSERT INTO ATAREFASTATUS (TITULO, DESCRICAO, DATACRIACAO, DATAALTERACAO, USUARIOCRIACAO, USUARIOALTERACAO, STATUS)  VALUES (?,?,?,?,?,?,?);";
    const values = 
    [
        tarefaStatus.titulo,
        tarefaStatus.descricao,
        tarefaStatus.datacriacao,
        tarefaStatus.dataalteracao,
        tarefaStatus.usuariocriacao,
        tarefaStatus.usuarioalteracao,
        tarefaStatus.status,
    ];

    await conn.query(sql,values );
}
async function updateATarefaStatus(id, tarefaStatus){
    const conn = await connect();
    const sql = 'UPDATE ATAREFASTATUS SET TITULO=?, DESCRICAO=?, DATACRIACAO=?, DATAALTERACAO=?, USUARIOCRIACAO=?, USUARIOALTERACAO=?, STATUS=? WHERE IDSTATUS = ?';
    const values = [

        tarefaStatus.titulo,
        tarefaStatus.descricao,
        tarefaStatus.datacriacao,
        tarefaStatus.dataalteracao,
        tarefaStatus.usuariocriacao,
        tarefaStatus.usuarioalteracao,
        tarefaStatus.status,
        id
    ];

    return await conn.query(sql,values);
}
async function deleteATarefaStatus(tarefaStatus){
    const conn = await connect();
    const sql = 'DELETE FROM ATAREFASTATUS WHERE IDSTATUS=?;';
    const values = [tarefaStatus];
    return await conn.query(sql,values);
}

module.exports = {selectATarefasStatus,selectATarefaStatus,insertATarefaStatus,updateATarefaStatus,deleteATarefaStatus};