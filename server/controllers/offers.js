const Offer = require("../models/offers");
const Product = require("../models/product");
const ObjectId = require("mongodb").ObjectId;
module.exports = {
     addOffer: async (req, res) => {
          console.log(req.body);
          const today = new Date();
          const tomorrow = new Date();
          tomorrow.setDate(today.getDate() + 2);
          const date = tomorrow.toLocaleString();
          const data = {
               title: req.body.title,
               type: req.body.type,
               offerAmount: req.body.offerAmount,
               minimumPurchase: req.body.minimumPurchase,
               expireAt: date,
               expireDate: tomorrow,
          };
          let updateProduct = null;
          const maxPrice = (data.minimumPurchase * 15) / 100;
          console.log(maxPrice);
          try {
               if (data.title === "Category") {
                    updateProduct = await Product.updateMany(
                         { Category: data.type, SellingPrice: { $gte: data.minimumPurchase } },
                         { $set: { Offer: data.offerAmount, OfferType: data.type } }
                    );
               } else if (data.title === "SubCategory") {
                    updateProduct = await Product.updateMany(
                         { SubCategory: data.type, SellingPrice: { $gte: data.minimumPurchase } },
                         { $set: { Offer: data.offerAmount, OfferType: data.type } }
                    );
               } else if (data.title === "Coupon Code") {
                    updateProduct = true;
               }
               if (!updateProduct) {
                    return res.status(500).json({ message: "No Products In this Criteria, Lower the Minimum Purchase" });
               }

               if (data.offerAmount >= maxPrice) {
                    return res.status(500).json({ message: "Maximum Offer for this Minimum Purchase is - ", maxPrice });
               }

               const newOffer = await Offer.create(data);
               if (newOffer && updateProduct) {
                    const allOffer = await Offer.find();
                    if (allOffer) {
                         return res.status(200).json({ message: " Offer Created Successfully", allOffer });
                    }
               }
          } catch (error) {
               console.log("ADDAYI BUT ENTHAROO KOYAPPAM");
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
     deleOffer: async (req, res) => {
          const { _id, type } = req.body;
          try {
               const newOffer = await Offer.deleteOne({ _id: ObjectId(_id) });
               const updateProduct = await Product.updateMany({ OfferType: type }, { $set: { Offer: 0, OfferType: "" } });
               if (newOffer && updateProduct) {
                    const allOffer = await Offer.find();
                    if (allOffer) {
                         return res.status(200).json({ message: " Offer Deleted Successfully", allOffer });
                    }
               }
          } catch (error) {
               console.log("ADDAYI BUT ENTHAROO KOYAPPAM");
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
     applyCoupon: async (req, res) => {
          console.log(req.body);
          const { data, total } = req.body;

          try {
               const valid = ObjectId.isValid(data);
               console.log(valid);
               if (!valid) {
                    return res.status(500).json({ message: "Check  Coupon Code Properly" });
               }
               const CouponCode = await Offer.findOne({ _id: ObjectId(data) });
               console.log(CouponCode);
               if (CouponCode) {
                    let dateExpiry = Date.parse(CouponCode.expireAt);
                    if (CouponCode.minimumPurchase > total) {
                         const balance = total - CouponCode.minimumPurchase;
                         return res
                              .status(500)
                              .json({ message: `Add  ${balance} Ruppes Products More To Avail This Offer ` });
                    }
                    // if (dateExpiry < dateStart) {
                    //      return res.status(500).json({ message: "Offer Expired" });
                    // }

                    return res.status(200).json({ message: " Offer Applied", CouponCode });
               }
               return res.status(500).json({ message: "Invalid Coupon Code" });
          } catch (error) {
               console.log("ADDAYI BUT ENTHAROO KOYAPPAM");
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
     getCoupon:async(req,res)=>{
          try {
               const couponData = await Offer.find({type:"Coupon Code"})
               if (couponData){
                    return res.status(200).json({ message: " coupon fetched", couponData });

               }
               return res.status(500).json({ message: "No Coupons found" });
          } catch (error) {;
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }

     }
};
