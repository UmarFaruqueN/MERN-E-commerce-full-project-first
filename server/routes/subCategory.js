const express = require('express')
const router = express.Router();

const {addSubCategory,getSubCategory,updateSubCategory,deleteSubCategory} =require('../controllers/subCategory')

//middleware


//api routes

router.post("/add",addSubCategory);
router.get("/get",getSubCategory);
router.post("/update",updateSubCategory)
router.post("/delete",deleteSubCategory)




module.exports = router; 