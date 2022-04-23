const express = require('express');
var cors = require('cors')
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var userRoutes =require('./routes/user');
var adminRoutes =require('./routes/admin')
var categoryRoutes =require('./routes/category')
var subCategoryRoutes =require('./routes/subCategory')
var typeRoutes =require('./routes/type')
var productRoutes =require('./routes/product')
var bannerRoutes =require('./routes/banner')

require("dotenv").config();


//app
const app = express();



//middleware
app.use(cors())

app.use(function (req, res, next) {
  res.set("cache-control", "no-cache,no-store,must-revalidate");
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "Key", cookie: { maxAge: 600000 } }));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));



//routes 
app.use('/',userRoutes);
app.use('/admin',adminRoutes);
app.use('/category',categoryRoutes);
app.use('/subCategory',subCategoryRoutes);
app.use('/type',typeRoutes);
app.use('/product',productRoutes);
app.use('/banner',bannerRoutes);




//db 

//port

const port =process.env.PORT || 4000;
 
const server = app.listen(port,()=>{
  console.log(`server is running on PORT ${port}`);
})


