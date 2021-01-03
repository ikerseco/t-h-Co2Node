const express = require('express')
const router = express.Router();
const indexCtrl = require('../controlers/indexCtrl.js')



//sokect 
router.get("/index",indexCtrl.index)



module.exports = router