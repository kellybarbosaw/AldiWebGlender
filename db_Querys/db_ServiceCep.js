require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

//GERENCIAMENTO DE CEP
async function selectEstado(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM GETD;');
    return rows;
}
async function selectEstadoPais(cod_pais){
    const conn = await connect();
    const [rows] = await conn.query('SELECT E.* FROM GETD E INNER JOIN GPAIS P ON P.IDPAIS = E.IDPAIS WHERE P.CODPAIS = ?', cod_pais);
    return rows;
}
async function selectPais(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM GPAIS;');
    return rows;
}
async function selectCidadeUF(estado){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM GCONSIST WHERE CODCLIENTE = ?',estado);
    return rows;
}
async function selectOrgaoEmissor(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM orgao_expedidor');
    return rows;
}


module.exports = {selectEstado,selectPais,selectCidadeUF,selectEstadoPais,selectOrgaoEmissor};