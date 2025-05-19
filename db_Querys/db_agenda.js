
require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

//GERENCIAMENTO DE AGENDA
async function selectAagendas(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM agenda;');
    return rows;
}
async function selectAagenda(id){
    const conn = await connect();
    const agenda = await conn.query('SELECT * FROM agenda WHERE IDAGENDA = ?',id);
    return agenda;
}
async function selectAgendasByUsuarioCriacao(usuariocriacao) {
    console.log('Consultando agendas para o usuário:', usuariocriacao); // Adicione este log
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM agenda WHERE USUARIOCRIACAO = ?'; // Query filtrando pelo usuário
        db.query(query, [usuariocriacao], (err, results) => {
            if (err) {
                console.error('Erro ao buscar agendas no banco de dados:', err);
                reject(err);
            } else {
                console.log('Resultados da consulta:', results); // Adicione este log para ver os resultados
                resolve(results);
            }
        });
    });
}

async function insertAagenda(agenda){
    const conn = await connect();
    const sql = "INSERT INTO agenda (HORAINICIO, HORAFINAL, HORAALMOCO, HORAPREVISTA, HORAREALIZADA, ATIVIDADE, DATA, EMPRESATRABALHADA, STATUS, USUARIOCRIACAO)  VALUES (?,?,?,?,?,?,?,?,?,?);";
    const values = 
    [
        agenda.horainicio,
        agenda.horafinal,
        agenda.horaalmoco,
        agenda.horaprevista,
        agenda.horarealizada,
        agenda.atividade,
        agenda.data,
        agenda.empresaTrabalhada,
        agenda.status,
        agenda.usuariocriacao
    ];

    await conn.query(sql,values );
}
async function updateAagenda(id, agenda){
    const conn = await connect();
    const sql = 'UPDATE agenda SET HORAINICIO=?, HORAFINAL=?, HORAALMOCO=?, HORAPREVISTA=?, HORAREALIZADA=?, ATIVIDADE=?, DATA=?, EMPRESATRABALHADA=?, STATUS=? WHERE IDAGENDA = ?';
    const values = [

        agenda.horainicio,
        agenda.horafinal,
        agenda.horaalmoco,
        agenda.horaprevista,
        agenda.horarealizada,
        agenda.atividade,
        agenda.data,
        agenda.empresaTrabalhada,
        agenda.status,
        id
    ];

    return await conn.query(sql,values);
}
async function deleteAagenda(agenda){
    const conn = await connect();
    const sql = 'DELETE FROM agenda WHERE IDAGENDA=?;';
    const values = [agenda];
    return await conn.query(sql,values);
}

module.exports = {deleteAagenda,updateAagenda,insertAagenda,selectAagenda,selectAagendas,selectAgendasByUsuarioCriacao};
