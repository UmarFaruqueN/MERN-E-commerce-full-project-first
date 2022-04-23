const User = require("../models/user");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
     addWishlist: async (req, res) => {
          console.log("started adwish");
          console.log(req.body);
          const data = req.body;
          const user = req.body.user;
          try {
               const product = await User.findOne({
                    _id: ObjectId(user),
                    wishlist: { $elemMatch: { _id: data._id } },
               });

               console.log(product + "products");
               if (product) {
                    return res.status(500).json({ message: "Product Already In Wishlist" });
               }
               const addProduct = await User.findOneAndUpdate({ _id: ObjectId(user) }, { $push: { wishlist: data } });
               console.log(addProduct);

               const userData = await User.findOne({ _id: ObjectId(user) });
               const wishlistData = userData.wishlist;
               return res.status(200).json({ message: "  Product Added To Wishlist", wishlistData, userData });
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
     getWishlist: async (req, res) => {
          console.log("started getwish");
          const { user } = req.body;
          try {
               const userData = await User.findOne({ _id: ObjectId(user) });
               const wishlistData = userData.wishlist;
               return res.status(200).json({ message: "  Product Added To Wishlist", wishlistData, userData });
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
     deleWishlist: async (req, res) => {
          const { user, productId } = req.body;
          try {
               const deleteProduct = await User.findOneAndUpdate(
                    {
                         _id: ObjectId(user),
                    },
                    {
                         $pull: { wishlist: { _id: productId } },
                    }
               );

               if (deleteProduct) {
                    console.log(deleteProduct + "deleted");
                    const userData = await User.findOne({ _id: ObjectId(user) });
                    const wishlistData = userData.wishlist;
                    return res.status(200).json({ message: " Product Removed From Wishlist", wishlistData, userData });
               }
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
};
