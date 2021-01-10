const express = require('express')
const router = express.Router();
const indexCtrl = require('../controlers/indexCtrl.js')



//sokect
console.log("bai") 
router.get("/index",indexCtrl.index)



module.exports = router