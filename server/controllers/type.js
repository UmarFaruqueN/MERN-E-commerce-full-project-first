const Type = require("../models/type");
var objectId = require("mongodb").ObjectId;

module.exports = {
     addType: async (req, res) => {
          try {
               const type = await Type.findOne({ type: req.body.type });

               if (type) return res.status(400).json({ message: "This Type Is Already Exist" });

               const newType = await Type.create(req.body);
               const allType = await Type.find();
               return res.status(200).json({ message: " Type Created Successfully", allType });
          } catch (error) {
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     getType: async (req, res) => {
          try {
               const allType = await Type.find();

               if (allType) {
                    // console.log(typeData[0]);
                    res.status(200).json({ message: " Type Fetched Successfully", allType });
               } else {
                    return res.status(500).json({ message: "didnt got type from database" });
               }
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },

     updateType: async (req, res) => {
          const { _id } = req.body;
          try {
               console.log(req.body);

               const type = await Type.findOne({ type: req.body.type });

               if (type) return res.status(400).json({ message: "This Type Is Already Exist" });

               const updatedType = await Type.findOneAndUpdate(
                    { _id: objectId(req.body._id) },
                    { $set: { type: req.body.type } }
               );

               console.log(updatedType);
               if (!updatedType) return res.status(500).json({ message: "didn't update type" });
               const typeData = await Type.find({});
               return res.status(200).json({ message: "type Updated", typeData });
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
     deleteType: async (req, res) => {
          try {
               console.log(req.body);

               await Type.remove({ type: req.body.type });
               const typeData = await Type.find({});
               return res.status(200).json({ message: "type Deleted", typeData });
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
};
