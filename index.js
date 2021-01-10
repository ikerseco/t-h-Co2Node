const express = require('express')
const bodyParser= require ('body-parser')
const roouter = require('./roouters/router.js')
const socketIO = require('socket.io');
var mqtt = require('mqtt')


//firebase



const http = require('http');



const port = process.env.PORT || 30001;
const app = express();

const server = http.createServer(app);

//socket
const io = socketIO(server, {pingTimeout: 30000});
//mqtt
const client  = mqtt.connect('mqtt://127.0.0.1:1883')

app.use (bodyParser.urlencoded({ extended: false}));
app.use (bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})


app.use(roouter)

const arDAT = {
  mac:"24:62:AB:C9:BB:F4",
  user:"garrantsitsua@gmail.com"
}

//socket adn mqtt
io.on('connection', (socket) => {
  console.log(socket.id)
  //mqtt
  client.subscribe('arduino/mac', function (err) {
    if (!err) {
     // client.publish('arduino/mac', 'Hello mqtt')
    }
  })
  client.on('message', function (topic, message) {context = message.toString();
        switch(topic){
          case "arduino/mac":
            console.log("arduino/mac")
            console.log(context)
            console.log(topic)
            break
          case "arduino/data":
            console.log("arduino/data")
            console.log(context)
            console.log(topic)
            break
        }
  })
});


/*
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
*/



  
server.listen(port, () => {
    console.log(`Servidor up en http://127.0.0.1:${port}`);
});

