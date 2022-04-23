const express = require('express')
const router = express.Router();

const {addType,getType,updateType,deleteType} =require('../controllers/type')

//middleware


//api routes

router.post("/add",addType);
router.get("/get",getType);
router.post("/update",updateType)
router.post("/delete",deleteType)




module.exports = router; 
