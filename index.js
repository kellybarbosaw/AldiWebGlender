require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const clientRouter = require('./routes/clientesRoute');
const cors = require('cors');
const path = require('path');

//tudo que vier de requisião com url '/user' , pegamos do body com express.json e usamos o 
//userRouter(gerenciador de rotas de cada modulo) para identificar o restante da rota e mandar para o controlador correto
app.use(cors({
    origin:"http://localhost:4200",
    methods:["GET","POST","PUT","DELETE"]
}))

//Gerenciamento de Rotas inicial.
app.use('/user', express.json(), userRouter);
app.use('/admin', express.json(), adminRouter);
app.use('/client', express.json(), clientRouter);





//NÃO MEXER AQUI EM BAIXO
if (process.env.NODE_ENV != 'development') {

    app.use(express.static(path.join(__dirname, 'client/dist/client/browser')));

    //função para servir arquivo quando o build estiver pronto e rodando localmente

    // app.get('/teste', (req, res) => {

    //     try {
    //         res.sendFile(path.join(__dirname, 'client/dist/client/browser/index.html'))
    //     } catch (err) {
    //         res.status(500).send(err);
    //     }
    // })
}

app.listen(process.env.PORT, () => { console.log("Server Running on Port: "+process.env.PORT)});
