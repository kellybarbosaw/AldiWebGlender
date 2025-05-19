require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const agendaRouter = require('./routes/agendaRoutes');

const https = require('https');
const fs = require('fs');


const cors = require('cors');
const path = require('path');

//tudo que vier de requisião com url '/user' , pegamos do body com express.json e usamos o 
//userRouter(gerenciador de rotas de cada modulo) para identificar o restante da rota e mandar para o controlador correto
app.use(cors({
    // origin:"https://aldiweb.com.br",
    origin:"http://localhost:4200",
    methods:["GET","POST","PUT","DELETE"],
    exposedHeaders: ['Quantidades_Registros']
}))

//Gerenciamento de Rotas inicial.
app.use('/user', express.json(), userRouter);
app.use('/agenda', express.json(), agendaRouter);


const options = {
    key: fs.readFileSync('server.key'),     // Caminho para sua chave privada
    cert: fs.readFileSync('server.cert')    // Caminho para seu certificado
};


//NÃO MEXER AQUI EM BAIXO
if (process.env.NODE_ENV != 'development') {

    // app.use(express.static(path.join(__dirname, 'client/dist/client/browser')));

    //função para servir arquivo quando o build estiver pronto e rodando localmente

    // app.get('/teste', (req, res) => {

    //     try {
    //         res.sendFile(path.join(__dirname, 'client/dist/client/browser/index.html'))
    //     } catch (err) {
    //         res.status(500).send(err);
    //     }
    // })
}



// RODAR API EM DESENVOLVIMENTO
app.listen(process.env.PORT, () => { console.log("Server Running on Port: "+process.env.PORT)});



// RODAR API EM PRE PRODUÇÃO
// https.createServer(options, app).listen(process.env.PORT, () => {
//     console.log(`Servidor HTTPS iniciado na porta ${process.env.PORT}`);
// });