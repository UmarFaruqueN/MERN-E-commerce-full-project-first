const Product = require("../models/product");
const Category = require("../models/category");
const SubCategory = require("../models/subCategory");
const Type = require("../models/type");
const ObjectId = require("mongodb").ObjectId;
const cloudinary = require("../utils/clounidary");
const Banner = require("../models/banner");
const Cart = require("../models/cart");
const Order = require("../models/order");
const Offer = require("../models/offers");

module.exports = {
     addProduct: async (req, res) => {
          console.log("started controller");
          try {
               const ModelNumberData = await Product.findOne({ ModelNumber: req.body.ModelNumber });
               const ProductNameData = await Product.findOne({ ProductName: req.body.ProductName });
               console.log(ProductNameData);

               if (ModelNumberData) return res.status(400).json({ message: "This Model Number Is Already Exist" });
               if (ProductNameData) return res.status(400).json({ message: "This Product Name Is Already Exist" });

               const newProduct = await Product.create(req.body);
               console.log(newProduct);

               if (newProduct) {
                    const allProduct = await Product.find();
                    return res.status(200).json({ message: " Product Created Successfully", allProduct, newProduct });
               }
          } catch (error) {
               console.log("ADDAYI BUT ENTHAROO KOYAPPAM");
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
     getAllProduct: async (req, res) => {
          console.log("on controller all");
          try {
               const allProduct = await Product.find();
               const allCategory = await Category.find();
               const allSubCategory = await SubCategory.find();
               const allType = await Type.find();
               const allBanner = await Banner.find();
               const allOrders = await Order.find();
               const allOffer = await Offer.find();
               console.log(allOffer);

               if (allProduct) {
                    // console.log(ProductData[0]);
                    res.status(200).json({
                         message: " Product Fetched Successfully",
                         allProduct,
                         allCategory,
                         allSubCategory,
                         allType,
                         allBanner,
                         allOrders,
                         allOffer,
                    });
               } else {
                    return res.status(500).json({ message: "didnt got Product from database" });
               }
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
     getProduct: async (req, res) => {
          console.log("on controller of one Product");
          console.log(req.body._id);
          try {
               const oneProduct = await Product.findOne({ _id: ObjectId(req.body._id) });

               if (oneProduct) {
                    // console.log(ProductData[0]);
                    res.status(200).json({
                         message: " Product Fetched Successfully",
                         oneProduct,
                    });
               } else {
                    return res.status(500).json({ message: "didnt got Product from database" });
               }
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },

     updateProduct: async (req, res) => {
          console.log("update Controler started");
          console.log(req.body);

          try {
               const product = await Product.findOneAndUpdate(
                    { _id: ObjectId(req.body._id) },
                    {
                         $set: {
                              ProductName: req.body.ProductName,
                              ModelNumber: req.body.ModelNumber,
                              Category: req.body.Category,
                              SubCategory: req.body.SubCategory,
                              Type: req.body.Type,
                              Stock: req.body.Stock,
                              LandingCost: req.body.LandingCost,
                              SellingPrice: req.body.SellingPrice,
                              Description: req.body.Description,
                         },
                    }
               );
               console.log(product);
               if (product) {
                    res.status(200).json({
                         message: " Product Updated Successfully",
                         product,
                    });
               } else {
                    return res.status(500).json({ message: "didnt got Product from database" });
               }
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
     deleteProduct: async (req, res) => {
          console.log("controller");
          try {
               console.log(req.body);

               await Product.deleteOne({ _id: ObjectId(req.body._id) });
               const productData = await Product.find({});
               return res.status(200).json({ message: "product Deleted", productData });
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },

     addImage: async (req, res) => {
          console.log("started controller");

          console.log(req.files[0]);

          try {
               console.log("started try");
               console.log(req.body.data + "this");
               const data = await JSON.parse(req.body.data);
               console.log(data);
               const product = await Product.findOne({ _id: ObjectId(data) });

               console.log(product + "thus");

               if (!product) {
                    return res.status(500).json({ message: "No Product Found" });
               }
               console.log(req.files[0].path);
               const img1 = await cloudinary.uploader.upload(req.files[0].path);
               const img2 = await cloudinary.uploader.upload(req.files[1].path);
               const img3 = await cloudinary.uploader.upload(req.files[2].path);
               const img4 = await cloudinary.uploader.upload(req.files[3].path);

               const addImages = await Product.findByIdAndUpdate(
                    { _id: ObjectId(data) },
                    {
                         $set: {
                              Image1: img1.secure_url,
                              Image1id: img1.public_id,
                              Image2: img2.secure_url,
                              Image2id: img2.public_id,
                              Image3: img3.secure_url,
                              Image3id: img3.public_id,
                              Image4: img4.secure_url,
                              Image4id: img4.public_id,
                         },
                    }
               );

               const allProduct = await Product.find();

               return res.status(200).json({ message: " Product Created Successfully", allProduct });
          } catch (error) {
               console.log(error.message + "entho error");
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     getOneProduct: async (req, res) => {
          const { _id } = req.body;
          console.log(_id);
          try {
               const oneProduct = await Product.findOne({ _id: ObjectId(_id) });
               if (oneProduct) {
                    return res.status(200).json({ message: " Product fetched Successfully", oneProduct });
               }
          } catch (error) {
               console.log(error.message + "entho error");
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     getProductsbyCat:async (req, res) => {
          try {
               const HD = await Product.find({Category:"Analogue Devices"})
               const IP = await Product.find({Category:"Network Devices"})
               if(HD&&IP){
               return res.status(200).json({ message: " Product fetched Successfully", HD,IP });}
          } catch (error) {
               console.log(error.message + "entho error");
               return res.status(500).json({ message: "something went wrong" });
          }
          
     },
     
};
