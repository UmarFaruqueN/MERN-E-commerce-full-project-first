const Category = require("../models/category");
var objectId = require("mongodb").ObjectId;

module.exports = {
     addCategory: async (req, res) => {
          try {
               const category = await Category.findOne({ category: req.body.category });

               if (category) return res.status(400).json({ message: "This Category Is Already Exist" });

               const newCategory = await Category.create(req.body);
               const allCategory = await Category.find();
               return res.status(200).json({ message: " Category Created Successfully", allCategory });
          } catch (error) {
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     getCategory: async (req, res) => {
          try {
               const allCategory = await Category.find();

               if (allCategory) {
                    // console.log(categoryData[0]);
                    res.status(200).json({ message: " Category Fetched Successfully", allCategory });
               } else {
                    return res.status(500).json({ message: "didnt got category from database" });
               }
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },

     updateCategory: async (req, res) => {
          const { _id } = req.body;
          try {
               console.log(req.body);

               const category = await Category.findOne({ category: req.body.category });

               if (category) return res.status(400).json({ message: "This Category Is Already Exist" });

               const updatedCategory = await Category.findOneAndUpdate(
                    { _id: objectId(req.body._id) },
                    { $set: { category: req.body.category } }
               );

               console.log(updatedCategory);
               if (!updatedCategory) return res.status(500).json({ message: "didn't update category" });
               const categoryData = await Category.find({});
               return res.status(200).json({ message: "category Updated", categoryData });
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
     deleteCategory: async (req, res) => {
          try {
               console.log(req.body);

               await Category.remove({ category: req.body.category });
               const categoryData = await Category.find({});
               return res.status(200).json({ message: "category Deleted", categoryData });
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
};
