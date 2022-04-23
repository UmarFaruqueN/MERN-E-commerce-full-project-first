const express = require("express");
const router = express.Router();

const { addBanner,getBanner,deleteBanner } = require("../controllers/banner");


//middleware
const upload = require("../utils/multer");


router.post("/add", upload.array("img"), addBanner);
router.post("/get", getBanner);
router.post("/delete", deleteBanner);



module.exports = router;
