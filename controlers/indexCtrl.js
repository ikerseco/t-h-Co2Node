const socket = require('socket.io-client')('http://127.0.0.1:30001');
 
exports.index = (req,res) =>{
   socket.on('connect', function(){});
   res.status(200).send("bai")     
}
