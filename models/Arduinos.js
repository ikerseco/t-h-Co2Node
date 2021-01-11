const mongoose = require("mongoose");

const Arduino = new  mongoose.Schema({
    mac : String,
    gmail : String
})

module.exports = mongoose.model('Arduinos',Arduino)