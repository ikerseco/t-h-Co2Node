const express = require('express')
const bodyParser= require ('body-parser')
const roouter = require('./roouters/router.js')
const socketIO = require('socket.io');
const mqtt = require('mqtt')
//mongodbRouter 
const mongoose = require('mongoose')
const mongodbRouter = 'mongodb+srv://webpush:n3BFWWqqLr1UWqKs@webpush.qinwo.mongodb.net/webpush-shard-00-02?retryWrites=true&w=majority'
//axios
const axios = require('axios');



const http = require('http');



//sokect server
const portSokect = process.env.PORT || 30001;
const serverSokect = http.createServer();

//router server
const app = express();
const portRouter = process.env.PORT || 40001
const serverRouter = http.createServer(app)



//socket
const io = socketIO(serverSokect, {pingTimeout: 30000});
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


  const ArduinosAr = []
  //mqtt & tcp
    //socket adn mqtt
  io.on('connection', (socket) => {
      console.log(socket.id)
      socket.emit('mensaje', 'apa kaixo' );
      socket.on('erantzuna', function (data) {
        console.log(data);
      })
      socket.on('initUser#post',(dat)=>{
        axios.get('http://127.0.0.1:40001/getUser',{}).then((dat)=>{
          console.log("correcto")
          console.log(dat)
        }).catch(function(err){
          console.log("err")
        })
        socket.emit('initUser#get', 'initUser#get')
      })
      /*
      io.on('initUser#post',(dat)=>{
        console.log(dat)
        io.emit('initUser#get', 'ok soceckt')
      })*/
      //mqtt
      //subcribe

      client.subscribe('arduino/mac', function (err) {
        console.log("arduino/mac")
        if (!err) {
        // client.publish('arduino/mac', 'Hello mqtt')
        }
      })

      client.subscribe('arduino/data', function (err) {
        console.log("arduino/data")
        if (!err) {
        // client.publish('arduino/mac', 'Hello mqtt')
        }
      })

      client.on('message', function (topic, message) {
            context = message.toString();
            switch(topic){
              case "arduino/mac":
                console.log("arduino/mac")
                console.log(context)
                console.log(topic)
                axios.post('http://127.0.0.1:40001/postMAC',{mac:context}).then((dat)=>{
                  console.log("correcto")
                  client.publish('arduino/24:62:AB:C9:BB:F4', 'Hello mqtt')
                }).catch(function(err){
                  console.log("err")
                })
                break
              case "arduino/data":
                console.log("arduino/data")
                console.log(context)
                console.log(topic)
                client.publish('arduino/24:62:AB:C9:BB:F4', 'Hello mqtt')
                break
            }
      })
  });


/*/
var socket1 = require('socket.io-client')('http://127.0.0.1:30001');
setInterval(function(){ 
  socket1.emit('initUser#post', 'ok soceckt');
  socket1.on('initUser#get',(data)=>{
    console.log(data)
  })
}, 3000);*/

var socket2 = require('socket.io-client')('http://127.0.0.1:30001');
socket2.emit('initUser#post',"initUser#post")
socket2.on('initUser#get', function (data) {
  console.log(data);
});



//conexion mongodb

const options = {
  socketTimeoutMS: 0,
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(mongodbRouter,options,(err)=>{
    if(err){
      return console.log('error en la conexion atlas mongoDB')
    }
    serverRouter.listen(portRouter, () => {
      console.log(`Servidor router up en http://127.0.0.1:${portRouter}`);
    });
    serverSokect.listen(portSokect, () => {
      console.log(`Servidor Sokect up en http://127.0.0.1:${portSokect}`);
    });
})
  

