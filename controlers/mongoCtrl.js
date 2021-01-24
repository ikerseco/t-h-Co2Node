const Arduinos = require('../models/Arduinos')

exports.postMAC = (req,res) =>{
    let body = req.body
    console.log(`body:\n${req.body.mac}`)
    let AduinoJson = {
        mac : req.body.mac,
    }
    let newArduino = new Arduinos(AduinoJson)
    newArduino.save(function (err, data) {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion', err });
        if (!data) return res.status(404).send({ message: `dato` });
        res.status(200).send(data);
    })    
}

exports.postUser = (req,res) =>{
    let body = req.body
    let mac = req.body.mac
    let gmail = req.body.gmail
    console.log(mac)
    console.log(gmail)
    Arduinos.findOneAndUpdate({mac:mac},{gmail:gmail},{new: true},(err,updata)=>{
        if (err) return res.status(500).send({ message: 'Error al crear usuario', err });
        if (!updata) return res.status(404).send({ message: `dato` });
        res.status(200).send(updata);
    })
}



exports.userConprobator = (req,res,next)=>{
    let gmail = req.body.gmail
    Arduinos.findOne({gmail:gmail},(err,data)=>{
        if (err) return res.status(500).send({ message: 'Error al crear el mazo', err });
        if (!data) return next()
        res.status(200).send(data)
    })
}

exports.macConprobator = (req,res,next)=>{
    let mac = req.body.mac
    Arduinos.findOne({mac:mac},(err,data)=>{
        if (err) return res.status(500).send({ message: 'Error al crear el mazo', err });
        if (!data) return next()
        res.status(200).send(data)
    })
}

exports.oneUser = (req,res)=>{
    let gmail = req.body.gmail
    Arduinos.findOne({gmail:gmail},(err,data)=>{
        if (err) return res.status(500).send({ message: 'al visualizar usuario', err });
        if (!data) return res.status(404).send({message:'usuario existe'})
        res.status(200).send(data)
    })
}