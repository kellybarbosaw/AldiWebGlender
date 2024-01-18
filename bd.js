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


//GERENCIAMENTO DE CONTRATOS/VENDAS

async function selectContracts(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM avendacomercial;');
    return rows;
}
async function selectContractID(id){
    const conn = await connect();
    const client = await conn.query('SELECT * FROM avendacomercial WHERE idvenda = ?',id);
    return client;
};
async function selectContractClient(id){
    const conn = await connect();
    const [client] = await conn.query('SELECT * FROM avendacomercial WHERE idcliente = ?',id);
    return client;
};
async function insertContract(contract){
    const conn = await connect();
    const sql = 'INSERT INTO avendacomercial (idcliente, descricaovenda, statusvenda, idprojeto, comercialvenda, dtcontato, dtcontrato, dtassinatura, dtconclusao, dtcriacao, dtalteracao, usuariocriacao, usuarioalteracao )  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);';
    const values = [contract.idcliente, contract.descricaovenda, contract.statusvenda, contract.idprojeto, contract.comercialvenda, contract.dtcontato, contract.dtcontrato, contract.dtassinatura, contract.dtconclusao, contract.dtcriacao, contract.dtalteracao, contract.usuariocriacao, contract.usuarioalteracao];
    await conn.query(sql,values );
}
async function updateContract(id, contract){
    const conn = await connect();
    const sql = 'UPDATE avendacomercial SET idcliente=?, descricaovenda=?, statusvenda=?, idprojeto=?, comercialvenda=?, dtcontato=?, dtcontrato=?, dtassinatura=?, dtconclusao=?, dtalteracao=?, usuarioalteracao=? WHERE idvenda = ?';
    const values = [contract.idcliente, contract.descricaovenda, contract.statusvenda, contract.idprojeto, contract.comercialvenda, contract.dtcontato, contract.dtcontrato, contract.dtassinatura, contract.dtconclusao, contract.dtalteracao, contract.usuarioalteracao, id];
    return await conn.query(sql,values);
}
async function deleteContract(id){
    const conn = await connect();
    const sql = 'DELETE FROM avendacomercial WHERE idvenda=?;';
    const values = [id];
    return await conn.query(sql,values);
}


//GERENCIAMENTO DE PROJETOS

async function selectAllProjects(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM aprojeto;');
    return rows;
}
async function selectProject(id){
    const conn = await connect();
    const project = await conn.query('SELECT * FROM aprojeto WHERE idprojeto = ?',id);
    return project;
};
async function selectProjectsContract(id){
    const conn = await connect();
    const [projects] = await conn.query('SELECT * FROM aprojeto WHERE idvenda = ?',id);
    return projects;
};
async function selectProjectsClients(id){
    const conn = await connect();
    const [projects] = await conn.query('SELECT * FROM aprojeto WHERE idcliente = ?',id);
    return projects;
};
async function insertProject(project){
    const conn = await connect();
    const sql = 'INSERT INTO aprojeto (titulo, descricao, idcliente, dtcriacao, dtalteracao, usuariocriacao, usuarioalteracao, statusprojeto, idvenda, dtinicioprojeto, dtconclusaoprojeto, horasestimadas, horasgastas, valorprojeto, valorconsumido)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    const values = [project.titulo, project.descricao, project.idcliente, project.dtcriacao, project.dtalteracao, project.usuariocriacao, project.usuarioalteracao, project.statusprojeto, project.idvenda, project.dtinicioprojeto, project.dtconclusaoprojeto, project.horasestimadas, project.horasgastas, project.valorprojeto, project.valorconsumido];
    await conn.query(sql,values );
}
async function updateProject(id, project){
    const conn = await connect();
    const sql = 'UPDATE aprojeto SET titulo=?, descricao=?, idcliente=?, dtcriacao=?, dtalteracao=?, usuariocriacao=?, usuarioalteracao=?, statusprojeto=?, idvenda=?, dtinicioprojeto=?, dtconclusaoprojeto=?, horasestimadas=?, horasgastas=?, valorprojeto=?, valorconsumido=? WHERE idprojeto = ?';
    const values = [project.titulo, project.descricao, project.idcliente, project.dtcriacao, project.dtalteracao, project.usuariocriacao, project.usuarioalteracao, project.statusprojeto, project.idvenda, project.dtinicioprojeto, project.dtconclusaoprojeto, project.horasestimadas, project.horasgastas, project.valorprojeto, project.valorconsumido, id];
    return await conn.query(sql,values);
}
async function deleteProject(id){
    const conn = await connect();
    const sql = 'DELETE FROM aprojeto WHERE idprojeto=?;';
    const values = [id];
    return await conn.query(sql,values);
}




//EXPORTANDO QUERY
module.exports = {selectProjectsClients,selectAllProjects,selectProject,selectProjectsContract,insertProject,updateProject,deleteProject,selectUser,selectUsers,insertUser,updateUser,deleteUser,selectUser,selectZClientes,selectZCliente,insertZCliente,updateZCliente,deleteZCliente,selectZClienteID,selectContracts,insertContract,selectContractID,selectContractClient,updateContract,deleteContract};
