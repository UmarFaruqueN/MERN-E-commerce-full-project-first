const User = require("../models/user");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
     addToCart: async (req, res) => {
          console.log("started  cart controller");
          console.log(req.body);
          const temp = req.body;
          const Price=temp.SellingPrice-temp.Offer
          const data ={...temp,Price}
          try {
               const product = await User.findOne({
                    _id: ObjectId(data.user),
                    cartProducts: { $elemMatch: { _id: data._id } },
               });

               console.log(product + "products");
               if (product) {
                    const updateCount = await User.findOneAndUpdate(
                         {
                              _id: ObjectId(data.user),
                              cartProducts: { $elemMatch: { _id: data._id } },
                         },
                         { $inc: { "cartProducts.$.count": data.count } }
                    );

                    console.log(updateCount + "updated");

                    const userData = await User.findOne({ _id: ObjectId(data.user) });
                    const cartData = userData.cartProducts;
                    
                    return res.status(200).json({ message: " Cart Updated SuccessFull", cartData, userData });
               }
               const addProduct = await User.findOneAndUpdate(
                    { _id: ObjectId(req.body.user) },
                    { $push: { cartProducts: data } }
               );
               console.log(addProduct);

               const userData = await User.findOne({ _id: ObjectId(data.user) });
               const cartData = userData.cartProducts;
               return res.status(200).json({ message: "  New Product Added To Cart", cartData, userData });
          } catch (error) {
               console.log("ADDAYI BUT ENTHAROO KOYAPPAM");
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     incCart: async (req, res) => {
          console.log("incart");
          const user = req.body.user;
          const product = req.body._id;
          console.log(user, product);
          try {
               const updateCount = await User.findOneAndUpdate(
                    {
                         _id: ObjectId(user),
                         cartProducts: { $elemMatch: { _id: product } },
                    },
                    { $inc: { "cartProducts.$.count": 1 } }
               );

               if (updateCount) {
                    const userData = await User.findOne({ _id: ObjectId(user) });
                    const cartData = userData.cartProducts;
                    return res.status(200).json({ message: "  incremented", cartData, userData });
               }

               return res.status(500).json({ message: "not incremneted" });
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     decCart: async (req, res) => {
          console.log("decart");
          const user = req.body.user;
          const product = req.body._id;
          console.log(user, product);
          try {
               const updateCount = await User.findOneAndUpdate(
                    {
                         _id: ObjectId(user),
                         cartProducts: { $elemMatch: { _id: product } },
                    },
                    { $inc: { "cartProducts.$.count": -1 } }
               );

               if (updateCount) {
                    const userData = await User.findOne({ _id: ObjectId(user) });
                    const cartData = userData.cartProducts;
                    
                    return res.status(200).json({ message: "  deccremented", cartData, userData });
               }

               return res.status(500).json({ message: "not deccremneted" });
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     deleCart: async (req, res) => {
          const user = req.body.user;
          const product = req.body._id;
          console.log(user, product);
          try {
               const deleteProduct = await User.findOneAndUpdate(
                    {
                         _id: ObjectId(user),
                    },
                    {
                         $pull: { cartProducts: { _id: product } },
                    }
               );

               if (deleteProduct) {
                    console.log(deleteProduct + "deleted");
                    const userData = await User.findOne({ _id: ObjectId(user) });
                    const cartData = userData.cartProducts;
                    const cartTotal = await User.aggregate([
                         { $match: { _id: ObjectId(user) } },
                         {$unwind:"$cartProducts" ,},{
                              $project:{quantity:"$cartProducts.count",price:"$cartProducts.SellingPrice"},
                         },{
                              $group:{
                                   _id:null,
                                   total:{$sum:{$multiply:["$quantity","$price"]}}
                              }
                         }
                        
                    ]);
                    return res.status(200).json({ message: " Product Removed From Cart", cartData, userData,cartTotal });
               }
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     totalCart: async (req, res) => {
        const {user}=req.body
          try {
               const cartTotal = await User.aggregate([
                    { $match: { _id: ObjectId(user) } },
                    {$unwind:"$cartProducts" ,},{
                         $project:{quantity:"$cartProducts.count",price:"$cartProducts.Price"},
                    },{
                         $group:{
                              _id:null,
                              total:{$sum:{$multiply:["$quantity","$price"]}}
                         }
                    }
                   
               ]);
               console.log(cartTotal+"divan");
               res.status(200).json({cartTotal})
          } catch (error) {}
     },

     getCartCount: async (req, res) => {
          //      console.log("onCartCount");
          //      console.log(req.body.user);
          //      try {
          //           let cartData = await Cart.aggregate([{ $match: { _id: { $eq: req.body.user } } }, {
          //                $project:{totalCount:{$sum:"cartProducts.$.count"}}
          //           }]);
          //           console.log(cartData);
          //      } catch (error) {}
     },
};
