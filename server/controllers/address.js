const { ObjectId } = require("mongodb");
const Address = require("../models/address");
module.exports = {
     addAddress: async (req, res) => {
          const { user } = req.body;
          const data = req.body;
          console.log("AdDress Startsss");

          try {
               const addAddress = await Address.create(data);
               if (addAddress) {
                    const allAddress = await Address.find({ user: user });
                    return res.status(200).json({ message: " Address Added", allAddress });
               }
               return res.status(500).json({ message: "No Address  Added" });
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     getAddress: async (req, res) => {
          const { user } = req.body;

          try {
               const allAddress = await Address.find({ user: user });
               if (allAddress) {
                    return res.status(200).json({ message: " Address fetched", allAddress });
               }
               return res.status(500).json({ message: "No Address  found" });
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     updateAddress: async (req, res) => {
          const { _id, user, name, phone, email, address, street, city, pin, district, state } = req.body;
          try {
               const updateAdress = await Address.findOneAndUpdate(
                    { _id: ObjectId(_id) },
                    {
                         $set: {
                              user: user,
                              name: name,
                              phone: phone,
                              email: email,
                              address: address,
                              street: street,
                              city: city,
                              pin: pin,
                              district: district,
                              state: state,
                         },
                    }
               );
               console.log(updateAdress);
               if (updateAdress) {
                    const allAddress = await Address.find({ user: user });
                    return res.status(200).json({ message: "Address Updated", allAddress });
               }
               return res.status(500).json({ message: "Address Not Updated" });
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
     deleteAddress: async (req, res) => {
          const { _id, user } = req.body;
          try {
               const deleAddress = await Address.deleteOne({ _id: ObjectId(_id) });
               if (deleAddress) {
                    const allAddress = await Address.find({ user: user });
                    return res.status(200).json({ message: " Address Removed", allAddress });
               }
               return res.status(500).json({ message: "Address Not Removed" });
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
};
