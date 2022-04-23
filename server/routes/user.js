const express = require('express')
const router = express.Router();

const {userSignup,mobileLogin,otpLogin,userLogin,getUser,editName,editPhone,editEmail,editPassword} =require('../controllers/user')
const {addToCart,incCart,decCart,deleCart,getCartCount,totalCart} =require("../controllers/cart")
const {addWishlist,getWishlist,deleWishlist} = require("../controllers/wishlist");
const { addOrder, getOrder,cancelOrder, } = require('../controllers/order');
const {addOrderRazorpay,getRazorpayKey} = require('../controllers/payment');
const {addAddress,updateAddress,deleteAddress,getAddress}= require("../controllers/address")
const {checkout} = require("../controllers/checkout")
const {applyCoupon,getCoupon} = require("../controllers/offers")

//middleware


//api routes
router.post("/userSignup",userSignup);
router.post("/mobile",mobileLogin)
router.post("/otp",otpLogin)  
router.post("/login",userLogin)    
router.post("/addToCart",addToCart)
router.post("/getCartCount",getCartCount)
router.post("/incCart",incCart)
router.post("/decCart",decCart)
router.post("/deleCart",deleCart)
router.post("/totalCart",totalCart)
router.post("/checkout",checkout)
router.post("/addWishlist",addWishlist)
router.post("/getWishlist",getWishlist)
router.post("/deleWishlist",deleWishlist)
router.post("/addAddress",addAddress)
router.post("/getAddress",getAddress)
router.post("/updateAddress",updateAddress)
router.post("/deleteAddress",deleteAddress)
router.post("/addOrder",addOrder)
router.get("/getRazorpayKey",getRazorpayKey)
router.post("/addOrderRazorpay",addOrderRazorpay)
router.post("/applyCoupon",applyCoupon)
router.get("/getCoupon",getCoupon)
router.post("/getOrder",getOrder)
router.post("/cancelOrder",cancelOrder)
router.post("/getUser",getUser)
router.post("/editName",editName)
router.post("/editPhone",editPhone)
router.post("/editEmail",editEmail)
router.post("/editPassword",editPassword)




module.exports = router; 

