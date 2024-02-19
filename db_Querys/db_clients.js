require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

//GERENCIAMENTO DE CLIENTES
async function selectZClientes() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM ZCLIENTE;');
    return rows;
}
async function selectZCliente(cnpj_cpf) {
    const conn = await connect();
    const client = await conn.query('SELECT * FROM ZCLIENTE WHERE CGCCFO = ?', cnpj_cpf);
    return client;
}
async function selectZClienteID(id) {
    const conn = await connect();
    const client = await conn.query('SELECT * FROM ZCLIENTE WHERE IDCLIENTE = ?', id);
    return client;
}
async function insertZCliente(client) {
    const conn = await connect();
    const sql = 'INSERT INTO ZCLIENTE ( NOMEFANTASIA, NOME, CGCCFO, INSCRESTADUAL, PAGREC, RUA, NUMERO, COMPLEMENTO, BAIRRO, CIDADE, CODETD, CEP, TELEFONE, RUAPGTO, NUMEROPGTO, COMPLEMENTOPGTO, BAIRROPGTO, CIDADEPGTO, CODETDPGTO, CEPPGTO, TELEFONEPAGTO, RUAENTREGA, NUMEROENTREGA, COMPLEMENTOENTREGA, BAIRROENTREGA, CIDADEENTREGA, CODETDENTREGA, CEPENTREGA, TELEFONEENTREGA, EMAIL, ATIVO, INSCRMUNICIPAL, PESSOAFISOUJUR, PAIS, PAISPGTO, PAISENTREGA ,EMAILENTREGA, EMAILPGTO, CODMUNICIPIOPGTO, CODMUNICIPIOENTREGA, DTCRIACAO, DTMODIFICACAO ,USUARIOCRIACAO ,USUARIOALTERACAO ,TIPOCLIENTE)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    const values = [client.nomefantasia, client.nome, client.cgccfo, client.inscrestadual, client.pagrec, client.rua, client.numero, client.complemento, client.bairro, client.cidade, client.codetd, client.cep, client.telefone, client.ruapgto, client.numeropgto, client.complementopgto, client.bairropgto, client.cidadepgto, client.codetdpgto, client.ceppgto, client.telefonepgto, client.ruaentrega, client.numeroentrega, client.complementoentrega, client.bairroentrega, client.cidadeentrega, client.codetdentrega, client.cepentrega, client.telefoneentrega, client.email, client.ativo, client.inscrmunicipal, client.pessoafisoujur, client.pais, client.paispgto, client.paisentrega, client.emailentrega, client.emailpgto, client.codmunicipiopgto, client.codmunicipioentrega, client.dtcriacao, client.dtmodificacao, client.usuariocriacao, client.usuarioalteracao, client.tipocliente];
    await conn.query(sql, values);
}
async function updateZCliente(id, client) {
    const conn = await connect();
    const sql = 'UPDATE ZCLIENTE SET NOMEFANTASIA=?, NOME=?, CGCCFO=?, INSCRESTADUAL=?, PAGREC=?, RUA=?, NUMERO=?, COMPLEMENTO=?, BAIRRO=?, CIDADE=?, CODETD=?, CEP=?, TELEFONE=?, RUAPGTO=?, NUMEROPGTO=?, COMPLEMENTOPGTO=?, BAIRROPGTO=?, CIDADEPGTO=?, CODETDPGTO=?, CEPPGTO=?, TELEFONEPAGTO=?, RUAENTREGA=?, NUMEROENTREGA=?, COMPLEMENTOENTREGA=?, BAIRROENTREGA=?, CIDADEENTREGA=?, CODETDENTREGA=?, CEPENTREGA=?, TELEFONEENTREGA=?, EMAIL=?, ATIVO=?, INSCRMUNICIPAL=?, PESSOAFISOUJUR=?, PAIS=?, PAISPGTO=?, PAISENTREGA=?, EMAILENTREGA=?, EMAILPGTO=?, CODMUNICIPIOPGTO=?, CODMUNICIPIOENTREGA=?, DTCRIACAO=?, DTMODIFICACAO=?, USUARIOCRIACAO=?, USUARIOALTERACAO=?, TIPOCLIENTE=? WHERE IDCLIENTE = ?';
    const values = [client.nomefantasia, client.nome, client.cgccfo, client.inscrestadual, client.pagrec, client.rua, client.numero, client.complemento, client.bairro, client.cidade, client.codetd, client.cep, client.telefone, client.ruapgto, client.numeropgto, client.complementopgto, client.bairropgto, client.cidadepgto, client.codetdpgto, client.ceppgto, client.telefonepgto, client.ruaentrega, client.numeroentrega, client.complementoentrega, client.bairroentrega, client.cidadeentrega, client.codetdentrega, client.cepentrega, client.telefoneentrega, client.email, client.ativo, client.inscrmunicipal, client.pessoafisoujur, client.pais, client.paispgto, client.paisentrega, client.emailentrega, client.emailpgto, client.codmunicipiopgto, client.codmunicipioentrega, client.dtcriacao, client.dtmodificacao, client.usuariocriacao, client.usuarioalteracao, client.tipocliente, id];
    return await conn.query(sql, values);
}
async function deleteZCliente(id) {
    const conn = await connect();
    const sql = 'DELETE FROM ZCLIENTE WHERE IDCLIENTE=?;';
    const values = [id];
    return await conn.query(sql, values);
}

//EXPORTANDO QUERY
module.exports = {
    selectZClientes, selectZCliente, insertZCliente, updateZCliente, deleteZCliente, selectZClienteID
};