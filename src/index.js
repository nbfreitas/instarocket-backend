// Inicio da aplicação

// Dependências utilizadas
const express = require('express'); // mais importante
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express(); // função express cria um servidor

// Divide o servidor para suportar http e websocket (permite a comunicação em tempo real)
const server = require('http').Server(app);
const io = require('socket.io')(server);
const env = require('./environment');

// Conexão com o BD - Mongo
mongoose.connect(`mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}${env.DB_URL}`, {
  useNewUrlParser: true,
});

// Repassa o io para os controllers
app.use((req, res, next) => {
  req.io = io;

  next();
});

// Permite que todas URLs de diferentes servidores possam acessar o backend
// Sem isso o React nao iria acessar a aplicação
app.use(cors());

// Rota para acessar arquivos estáticos - imagens
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

// Declaração das rotas da aplicação
app.use(require('./routes'));

server.listen(3333);
