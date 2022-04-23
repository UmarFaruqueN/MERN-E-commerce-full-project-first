const express = require('express')
const router = express.Router();

const {addCategory,getCategory,updateCategory,deleteCategory} =require('../controllers/category')

//middleware


//api routes

router.post("/add",addCategory);
router.get("/get",getCategory);
router.post("/update",updateCategory)
router.post("/delete",deleteCategory)




module.exports = router; 
