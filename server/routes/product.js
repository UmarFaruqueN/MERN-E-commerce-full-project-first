const express = require("express");
const router = express.Router();

const {
     addProduct,
     getProduct,
     deleteProduct,
     addImage,
     getAllProduct,
     updateProduct,
     getOneProduct,
     getProductsbyCat,
} = require("../controllers/product");

//middleware
const upload = require("../utils/multer");

//api routes

router.post("/add", addProduct);
router.get("/getAll", getAllProduct);
router.post("/get", getProduct);
router.post("/getOneProduct", getOneProduct);
router.post("/update", updateProduct);
router.post("/delete", deleteProduct);
router.get("/getProductsbyCat", getProductsbyCat);
router.post("/image/add", upload.array("img"), addImage);

module.exports = router;
