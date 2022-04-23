const Banner = require("../models/banner");
const ObjectId = require("mongodb").ObjectId;
const cloudinary = require("../utils/clounidary");

module.exports = {
     addBanner: async (req, res) => {
          console.log("started  banner controller");

          console.log(req.files[0]);

          try {
               console.log("started try");
               console.log(req.body.data + "this");
               const data = await JSON.parse(req.body.data);
               console.log(data);
               console.log(req.files[0].path);
               const img1 = await cloudinary.uploader.upload(req.files[0].path);

               const newBanner = await Banner.create({
                    for: data,
                    banner: img1.secure_url,
                    bannerId: img1.public_id,
               });

               const allBanner = await Banner.find();

               return res.status(200).json({ message: " Banner Added Successfully", allBanner });
          } catch (error) {
               console.log(error.message + "entho error");
               return res.status(500).json({ message: "something went wrong" });
          }
     },
     getBanner: async (req, res) => {
          console.log(req.body);
          const { bannerFor } = req.body;
          console.log(req.body.bannerFor + "started getbanner");
          try {
               const allBanner = await Banner.find({ for: bannerFor });
               console.log(allBanner);
               if (allBanner) {
                    return res.status(200).json({ message: " Banner fetched Successfully", allBanner });
               }
          } catch (error) {
               console.log(error.message + "entho error");
               return res.status(500).json({ message: "something went wrong" });
          }
     },
     deleteBanner: async (req, res) => {
          console.log("on delete banner Controller");
          console.log(req.body);
          const { _id } = req.body;
          try {
               const DeleteBanner = await Banner.deleteOne({ _id: ObjectId(_id) });
               if (DeleteBanner) return res.status(200).json({ message: " Banner Deleted" });
               return res.status(500).json({ message: "Banner Not Deleted" });
          } catch (error) {
               console.log(error.message + "entho error");
               return res.status(500).json({ message: "something went wrong" });
          }
     },
};
