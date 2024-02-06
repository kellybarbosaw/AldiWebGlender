require('dotenv').config();
const mysql = require('mysql2/promise');

//CCONEXÃO BANCO DE DADOS
async function connect() {

    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    const connection = await mysql.createConnection({
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        port: process.env.PORT_DB,
        database: process.env.DATABASE_DB

    });

    global.connection = connection;
    return connection;
}

//GERENCIAMENTO DE USUARIOS
async function selectUsers() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM ZUSUARIO;');
    return rows;
}
async function selectUser(email) {
    const conn = await connect();
    const user = await conn.query('SELECT * FROM ZUSUARIO WHERE EMAIL = ?', email);
    return user;
}
async function selectForUser(usuario) {
    const conn = await connect();
    const user = await conn.query('SELECT * FROM ZUSUARIO WHERE USUARIO = ?', usuario);
    return user;
}
async function insertUser(user) {
    const conn = await connect();
    const sql = 'INSERT INTO ZUSUARIO (USUARIO, NOME, ATIVO, PERFIL, DATACRIACAO, DATAALTERACAO, USUARIOCRIACAO, USUARIOALTERACAO, SENHA, EMAIL)  VALUES (?,?,?,?,?,?,?,?,?,?);';
    const values = [user.usuario, user.nome, user.ativo, user.perfil, user.datacriacao, user.dataalteracao, user.usuariocriacao, user.usuarioalteracao, user.senha, user.email];
    await conn.query(sql, values);
}
async function updateUser(user, data) {
    const conn = await connect();
    const sql = 'UPDATE ZUSUARIO SET NOME=?, ATIVO=?, PERFIL=?, DATACRIACAO=?, DATAALTERACAO=?, USUARIOCRIACAO=?, USUARIOALTERACAO=?, SENHA=?, EMAIL=? WHERE USUARIO = ?';
    const values = [data.nome, data.ativo, data.perfil, data.datacriacao, data.dataalteracao, data.usuariocriacao, data.usuarioalteracao, data.senha, data.email, user];
    return await conn.query(sql, values);

}
async function deleteUser(user) {
    const conn = await connect();
    const sql = 'DELETE FROM ZUSUARIO WHERE USUARIO=?;';
    const values = [user];
    return await conn.query(sql, values);

}


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


//GERENCIAMENTO DE CONTRATOS/VENDAS
async function selectContracts() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM AVENDACOMERCIAL;');
    return rows;
}
async function selectContractID(id) {
    const conn = await connect();
    const client = await conn.query('SELECT * FROM AVENDACOMERCIAL WHERE IDVENDA = ?', id);
    return client;
};
async function selectContractClient(id) {
    const conn = await connect();
    const [client] = await conn.query('SELECT * FROM AVENDACOMERCIAL WHERE IDCLIENTE = ?', id);
    return client;
};
async function insertContract(contract) {
    const conn = await connect();
    const sql = 'INSERT INTO AVENDACOMERCIAL (IDCLIENTE, DESCRICAOVENDA, STATUSVENDA, IDPROJETO, COMERCIALVENDAcol, DTCONTATO, DTCONTRATO, DTASSINATURA, DTCONCLUSAO, DATACRIACAO, DATAALTERACAO, USUARIOCRIACAO, USUARIOALTERACAO )  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);';
    const values = [contract.idcliente, contract.descricaovenda, contract.statusvenda, contract.idprojeto, contract.comercialvendacol, contract.dtcontato, contract.dtcontrato, contract.dtassinatura, contract.dtconclusao, contract.dtcriacao, contract.dtalteracao, contract.usuariocriacao, contract.usuarioalteracao];
    await conn.query(sql, values);
}
async function updateContract(id, contract) {
    const conn = await connect();
    const sql = 'UPDATE AVENDACOMERCIAL SET IDCLIENTE=?, DESCRICAOVENDA=?, STATUSVENDA=?, IDPROJETO=?, COMERCIALVENDAcol=?, DTCONTATO=?, DTCONTRATO=?, DTASSINATURA=?, DTCONCLUSAO=?, DATACRIACAO=?, DATAALTERACAO=?, USUARIOCRIACAO=?, USUARIOALTERACAO=? WHERE IDVENDA = ? ';
    const values = [contract.idcliente, contract.descricaovenda, contract.statusvenda, contract.idprojeto, contract.comercialvendacol, contract.dtcontato, contract.dtcontrato, contract.dtassinatura, contract.dtconclusao, contract.dtcriacao, contract.dtalteracao, contract.usuariocriacao, contract.usuarioalteracao, id];
    return await conn.query(sql, values);
}
async function deleteContract(id) {
    const conn = await connect();
    const sql = 'DELETE FROM AVENDACOMERCIAL WHERE IDVENDA=?;';
    const values = [id];
    return await conn.query(sql, values);
}


//GERENCIAMENTO DE PROJETOS
async function selectAllProjects() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM APROJETO;');
    return rows;
}
async function selectProject(id) {
    const conn = await connect();
    const project = await conn.query('SELECT * FROM APROJETO WHERE IDPROJETO = ?', id);
    return project;
};
async function selectProjectsContract(id) {
    const conn = await connect();
    const [projects] = await conn.query('SELECT * FROM APROJETO WHERE IDVENDA = ?', id);
    return projects;
};
async function selectProjectsClients(id) {
    const conn = await connect();
    const [projects] = await conn.query('SELECT * FROM APROJETO WHERE IDCLIENTE = ?', id);
    return projects;
};
async function insertProject(project) {
    const conn = await connect();
    const sql = 'INSERT INTO APROJETO (TITULO, DESCRICAO, IDCLIENTE, DTCRIACAO, DTALTERACAO, USUARIOCRIACAO, USUARIOALTERACAO, STATUSPROJETO, IDVENDA, DTINCIOPROJETO, DTCONCLUSAOPROJETO, HORASESTIMADAS, HORASGASTAS, SALDOHORAS, VALORPROJETO, VALORCONSUMIDO)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    const values = [project.titulo, project.descricao, project.idcliente, project.dtcriacao, project.dtalteracao, project.usuariocriacao, project.usuarioalteracao, project.statusprojeto, project.idvenda, project.dtinicioprojeto, project.dtconclusaoprojeto, project.horasestimadas, project.horasgastas, project.saldohoras, project.valorprojeto, project.valorconsumido];
    await conn.query(sql, values);
}
async function updateProject(id, project) {
    const conn = await connect();
    const sql = 'UPDATE APROJETO SET TITULO=?, DESCRICAO=?, IDCLIENTE=?, DTCRIACAO=?, DTALTERACAO=?, USUARIOCRIACAO=?, USUARIOALTERACAO=?, STATUSPROJETO=?, IDVENDA=?, DTINCIOPROJETO=?, DTCONCLUSAOPROJETO=?, HORASESTIMADAS=?, HORASGASTAS=?, SALDOHORAS=?, VALORPROJETO=?, VALORCONSUMIDO=? WHERE IDPROJETO = ?';
    const values = [project.titulo, project.descricao, project.idcliente, project.dtcriacao, project.dtalteracao, project.usuariocriacao, project.usuarioalteracao, project.statusprojeto, project.idvenda, project.dtinicioprojeto, project.dtconclusaoprojeto, project.horasestimadas, project.horasgastas, project.saldohoras, project.valorprojeto, project.valorconsumido, id];
    return await conn.query(sql, values);
}
async function deleteProject(id) {
    const conn = await connect();
    const sql = 'DELETE FROM APROJETO WHERE IDPROJETO=?;';
    const values = [id];
    return await conn.query(sql, values);
}




//EXPORTANDO QUERY
module.exports = {
    selectUser, selectUsers, insertUser, updateUser, deleteUser, selectUser, selectForUser, 
    selectZClientes, selectZCliente, insertZCliente, updateZCliente, deleteZCliente, selectZClienteID, 
    selectContracts, insertContract, selectContractID, selectContractClient, updateContract, deleteContract,
    selectProjectsClients, selectAllProjects, selectProject, selectProjectsContract, insertProject, updateProject, deleteProject
};
