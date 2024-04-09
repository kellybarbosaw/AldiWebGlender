require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

//GERENCIAMENTO DE PROJETOS
async function selectAllProjects() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT P.*, Z.NOME AS NOMECLIENTE, A.DESCRICAOVENDA  FROM APROJETO P INNER JOIN AVENDACOMERCIAL A ON A.IDVENDA = P.IDVENDA INNER JOIN ZCLIENTE Z ON P.IDCLIENTE = Z.IDCLIENTE;');
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
    selectProjectsClients, selectAllProjects, selectProject, selectProjectsContract, insertProject, updateProject, deleteProject
};