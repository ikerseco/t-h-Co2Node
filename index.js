const express = require('express')
const bodyParser= require ('body-parser')
const roouter = require('./roouters/router.js')
const socketIO = require('socket.io');


//firebase



const http = require('http');


const port = process.env.PORT || 30001;
const app = express();

const server = http.createServer(app);

//socket

const io = socketIO(server, {pingTimeout: 30000});


app.use (bodyParser.urlencoded({ extended: false}));
app.use (bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})


app.use(roouter)


io.on('connection', (socket) => {
  console.log(socket.id)
  socket.emit('mensaje', `cliente${socket.id}` );
  socket.on('erantzuna', function (data) {
    console.log(socket.id)
    console.log(data);
  });
});

var socket1 = require('socket.io-client')('http://127.0.0.1:30001');
socket1.on('mensaje', function (data) {
  console.log(data);
  socket1.emit('erantzuna', 'apa kaixo' );
});


var socket2 = require('socket.io-client')('http://127.0.0.1:30001');
socket2.on('mensaje', function (data) {
  console.log(data);
  socket2.emit('erantzuna', 'apa kaixo' );
});


  
server.listen(port, () => {
    console.log(`Servidor up en http://127.0.0.1:${port}`);
});

