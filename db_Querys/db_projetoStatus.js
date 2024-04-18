require('dotenv').config();
const db = require('./bd');
const connect = db.connect

// GERENCIAMENTO DE PROJETO STATUS
async function selectAProjetosStatus(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM APROJETOSTATUS;');
    return rows;
}
async function selectAProjetoStatus(id){
    const conn = await connect();
    const projetoStatus = await conn.query('SELECT * FROM APROJETOSTATUS WHERE IDSTATUS = ?',id);
    return projetoStatus;
}
async function insertAProjetoStatus(projetoStatus){
    const conn = await connect();
    const sql = "INSERT INTO APROJETOSTATUS (TITULO, DESCRICAO, DATACRIACAO, DATAALTERACAO, USUARIOCRIACAO, USUARIOALTERACAO, STATUS)  VALUES (?,?,?,?,?,?,?);";
    const values = 
    [
        projetoStatus.titulo,
        projetoStatus.descricao,
        projetoStatus.datacriacao,
        projetoStatus.dataalteracao,
        projetoStatus.usuariocriacao,
        projetoStatus.usuarioalteracao,
        projetoStatus.status,
    ];

    await conn.query(sql,values );
}
async function updateAProjetoStatus(id, projetoStatus){
    const conn = await connect();
    const sql = 'UPDATE APROJETOSTATUS SET TITULO=?, DESCRICAO=?, DATACRIACAO=?, DATAALTERACAO=?, USUARIOCRIACAO=?, USUARIOALTERACAO=?, STATUS=? WHERE IDSTATUS = ?';
    const values = [

        projetoStatus.titulo,
        projetoStatus.descricao,
        projetoStatus.datacriacao,
        projetoStatus.dataalteracao,
        projetoStatus.usuariocriacao,
        projetoStatus.usuarioalteracao,
        projetoStatus.status,
        id
    ];

    return await conn.query(sql,values);
}
async function deleteAProjetoStatus(projetoStatus){
    const conn = await connect();
    const sql = 'DELETE FROM APROJETOSTATUS WHERE IDSTATUS=?;';
    const values = [projetoStatus];
    return await conn.query(sql,values);
}

module.exports = {selectAProjetosStatus,selectAProjetoStatus,insertAProjetoStatus,updateAProjetoStatus,deleteAProjetoStatus};