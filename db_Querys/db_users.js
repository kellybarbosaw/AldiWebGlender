require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

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
    const sql = 'UPDATE ZUSUARIO SET NOME=?, ATIVO=?, PERFIL=?, DATACRIACAO=?, DATAALTERACAO=?, USUARIOCRIACAO=?, USUARIOALTERACAO=?, EMAIL=? WHERE USUARIO = ?';
    const values = [data.nome, data.ativo, data.perfil, data.datacriacao, data.dataalteracao, data.usuariocriacao, data.usuarioalteracao, data.email, user];
    return await conn.query(sql, values);

}
async function deleteUser(user) {
    const conn = await connect();
    const sql = 'DELETE FROM ZUSUARIO WHERE USUARIO=?;';
    const values = [user];
    return await conn.query(sql, values);

}

//EXPORTANDO QUERY
module.exports = {
    selectUser, selectUsers, insertUser, updateUser, deleteUser, selectUser, selectForUser
};