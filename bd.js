require('dotenv').config();
const mysql = require('mysql2/promise');

//CCONEXÃO BANCO DE DADOS
async function connect() {

    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }

    const connection = await mysql.createConnection({
        host: process.env.HOST_DB,
        user:   process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        port: process.env.PORT_DB,
        database: process.env.DATABASE_DB
        
    });

    global.connection = connection;
    return connection;
}

//GERENCIAMENTO DE USUARIOS
async function selectUsers(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM usuarios;');
    return rows;
}
async function selectUser(email){
    const conn = await connect();
    const user = await conn.query('SELECT * FROM usuarios WHERE email = ?',email);
    return user;
}
async function insertUser(user){
    const conn = await connect();
    const sql = 'INSERT INTO usuarios (nome, email, senha, perfil, status)  VALUES (?,?,?,?,?);';
    const values = [user.nome,user.email,user.senha,user.perfil,user.status];
    await conn.query(sql,values );
}
async function updateUser(id, data){
    const conn = await connect();
    const sql = 'UPDATE usuarios SET nome=?, email=?, senha=?, perfil=?, status=? WHERE ID_user=?';
    const values = [data.nome,data.email,data.senha,data.perfil,data.status,id];
    return await conn.query(sql,values);

}
async function deleteUser(id){
    const conn = await connect();
    const sql = 'DELETE FROM usuarios WHERE ID_user=?;';
    const values = [id];
    return await conn.query(sql,values);

}


//GERENCIAMENTO DE CLIENTES
async function selectZClientes(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM ZCLIENTE2;');
    return rows;
}
async function selectZCliente(cnpj){
    const conn = await connect();
    const client = await conn.query('SELECT * FROM ZCLIENTE2 WHERE cnpj = ?',cnpj);
    return client;
}
async function selectZClienteID(id){
    const conn = await connect();
    const client = await conn.query('SELECT * FROM ZCLIENTE2 WHERE idclient = ?',id);
    return client;
}
async function insertZCliente(client){
    const conn = await connect();
    const sql = 'INSERT INTO ZCLIENTE2 (cnpj, nome, nomefantasia, inscrestadual, inscrmunicipal, telefone, celular, email, rua, numero, complemento, bairro, cidade, estado, pais, cep, respcomercial, telcomercial, celcomercial, emailcomercial, respfinanceiro, telfinanceiro, celfinanceiro, emailfinanceiro)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    const values = [client.cnpj, client.nome, client.nomefantasia, client.inscrestadual, client.inscrmunicipal, client.telefone, client.celular, client.email, client.rua, client.numero, client.complemento, client.bairro, client.cidade, client.estado, client.pais, client.cep, client.respcomercial, client.telcomercial, client.celcomercial, client.emailcomercial, client.respfinanceiro, client.telfinanceiro, client.celfinanceiro, client.emailfinanceiro];
    await conn.query(sql,values );
}
async function updateZCliente(id, client){
    const conn = await connect();
    const sql = 'UPDATE ZCLIENTE2 SET cnpj=?, nome=?, nomefantasia=?, inscrestadual=?, inscrmunicipal=?, telefone=?, celular=?, email=?, rua=?, numero=?, complemento=?, bairro=?, cidade=?, estado=?, pais=?, cep=?, respcomercial=?, telcomercial=?, celcomercial=?, emailcomercial=?, respfinanceiro=?, telfinanceiro=?, celfinanceiro=?, emailfinanceiro=? WHERE idclient = ?';
    const values = [client.cnpj, client.nome, client.nomefantasia, client.inscrestadual, client.inscrmunicipal, client.telefone, client.celular, client.email, client.rua, client.numero, client.complemento, client.bairro, client.cidade, client.estado, client.pais, client.cep, client.respcomercial, client.telcomercial, client.celcomercial, client.emailcomercial, client.respfinanceiro, client.telfinanceiro, client.celfinanceiro, client.emailfinanceiro, id];
    return await conn.query(sql,values);
}
async function deleteZCliente(id){
    const conn = await connect();
    const sql = 'DELETE FROM ZCLIENTE2 WHERE idclient=?;';
    const values = [id];
    return await conn.query(sql,values);
}


module.exports = {selectUser,selectUsers,insertUser,updateUser,deleteUser,selectUser,selectZClientes,selectZCliente,insertZCliente,updateZCliente,deleteZCliente,selectZClienteID};
