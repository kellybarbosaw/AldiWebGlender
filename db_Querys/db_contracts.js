require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

//GERENCIAMENTO DE CONTRATOS/VENDAS
async function selectContracts() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM AVENDACOMERCIAL;');
    return rows;
}
async function selectContractID(id) {
    const conn = await connect();
    // const client = await conn.query('SELECT * FROM AVENDACOMERCIAL WHERE IDVENDA = ?', id);
    const contract = await conn.query('SELECT *,Z.NOME as NOMECLIENTE FROM AVENDACOMERCIAL A INNER JOIN ZCLIENTE Z ON A.IDCLIENTE = Z.IDCLIENTE WHERE IDVENDA = ?', id);
    return contract;
};
async function selectContractClient(id) {
    const conn = await connect();
    const [contract] = await conn.query('SELECT * FROM AVENDACOMERCIAL WHERE IDCLIENTE = ?', id);
    return contract;
};
async function insertContract(contract) {
    const conn = await connect();
    const sql = 'INSERT INTO AVENDACOMERCIAL (IDCLIENTE, DESCRICAOVENDA, STATUSVENDA, IDPROJETO, COMERCIALVENDAcol, DTCONTATO, DTCONTRATO, DTASSINATURA, DTCONCLUSAO, DATACRIACAO, DATAALTERACAO, USUARIOCRIACAO, USUARIOALTERACAO )  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);';
    const values = [contract.idcliente, contract.descricaovenda, contract.statusvenda, contract.idprojeto, contract.comercialvendacol, contract.dtcontato, contract.dtcontrato, contract.dtassinatura, contract.dtconclusao, contract.dtcriacao, contract.dtalteracao, contract.usuariocriacao, contract.usuarioalteracao];
    await conn.query(sql, values);
}
async function updateContract(id, contract) {
    const conn = await connect();
    const sql = 'UPDATE AVENDACOMERCIAL SET IDCLIENTE=?, DESCRICAOVENDA=?, STATUSVENDA=?, IDPROJETO=?, COMERCIALVENDAcol=?, DTCONTATO=?, DTCONTRATO=?, DTASSINATURA=?, DTCONCLUSAO=?, DATAALTERACAO=?, USUARIOALTERACAO=? WHERE IDVENDA = ? ';
    const values = [contract.idcliente, contract.descricaovenda, contract.statusvenda, contract.idprojeto, contract.comercialvendacol, contract.dtcontato, contract.dtcontrato, contract.dtassinatura, contract.dtconclusao, contract.dtalteracao, contract.usuarioalteracao, id];
    return await conn.query(sql, values);
}
async function deleteContract(id) {
    const conn = await connect();
    const sql = 'DELETE FROM AVENDACOMERCIAL WHERE IDVENDA=?;';
    const values = [id];
    return await conn.query(sql, values);
}

//EXPORTANDO QUERY
module.exports = {
    selectContracts, insertContract, selectContractID, selectContractClient, updateContract, deleteContract
};