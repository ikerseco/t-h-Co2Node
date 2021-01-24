const express = require('express')
const router = express.Router();
const mongoCtrl = require('../controlers/mongoCtrl.js')



//sokect
router.post("/postMAC",mongoCtrl.macConprobator,mongoCtrl.postMAC)
router.get("/getUser",mongoCtrl.oneUser)


//web
router.put("/postUser",mongoCtrl.postUser)



module.exports = router