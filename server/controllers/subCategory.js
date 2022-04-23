const SubCategory = require("../models/subCategory");
var ObjectId = require("mongodb").ObjectId;

module.exports = {
     addSubCategory: async (req, res) => {
          try {
               const subCategory = await SubCategory.findOne({ category :req.body.category,subCategory: req.body.subCategory });

               if (subCategory) return res.status(400).json({ message: "This SubCategory Is Already Exist" });

               const newSubCategory = await SubCategory.create(req.body);
               const allSubCategory = await SubCategory.find();
               return res.status(200).json({ message: " SubCategory Created Successfully", allSubCategory });
          } catch (error) {
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     getSubCategory: async (req, res) => {
          try {
               const subCategoryData = await SubCategory.find();

               if (subCategoryData) {
                    // console.log(subCategoryData[0]);
                    res.status(200).json({ message: " SubCategory Fetched Successfully", subCategoryData });
               } else {
                    return res.status(500).json({ message: "didnt got subCategory from database" });
               }
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },

     updateSubCategory: async (req, res) => {
          const { _id } = req.body;
          try {
               console.log(req.body);

               const subCategory = await SubCategory.findOne({ category: req.body.category,subCategory: req.body.subCategory });

               if (subCategory) return res.status(400).json({ message: "This SubCategory Is Already Exist" });

               const updatedSubCategory = await SubCategory.findOneAndUpdate(
                    { _id: ObjectId(req.body._id) },
                    { $set: { category: req.body.category,subCategory: req.body.subCategory } }
               );

               console.log(updatedSubCategory);
               if (!updatedSubCategory) return res.status(500).json({ message: "didn't update subCategory" });
               const subCategoryData = await SubCategory.find({});
               return res.status(200).json({ message: "subCategory Updated", subCategoryData });
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
     deleteSubCategory: async (req, res) => {
          try {
               console.log(req.body);

               await SubCategory.deleteOne({ _id: ObjectId(req.body._id) });
               const subCategoryData = await SubCategory.find({});
               return res.status(200).json({ message: "subCategory Deleted", subCategoryData });
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
};
