const Admin = require("../models/admin");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

module.exports = {
     adminSignup: async (req, res) => {
          try {
               req.body.password = await bcrypt.hash(req.body.password, 10);
               console.log(req.body.password);
               console.log("started try");
               const adminEmail = await Admin.findOne({ email: req.body.email });
               const adminPhone = await Admin.findOne({ phone: req.body.phone });

               if (adminEmail) return res.status(400).json({ message: "This Email Is Already Registered" });
               if (adminPhone) return res.status(400).json({ message: "This Phone Is Already Registered" });

               console.log("new admin");
               const newAdmin = await Admin.create(req.body);
               res.status(200).json({ message: "Acoount Created Successfully", adminData: newAdmin });
          } catch (error) {
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
     adminLogin: async (req, res) => {
          const { email, password } = req.body;
          console.log(req.body);
          try {
               if (!email || !password) return res.status(400).json({ message: "empty input" });
               const admin = await Admin.findOne({ email });
               if (!admin) return res.status(400).json({ message: " no admin found" });
               const isPassword = bcrypt.compare(admin.password, password);
               console.log(isPassword);
               if (!isPassword) return res.status(400).json({ message: "invalid credentials" });
               const token = admin.generateAuthToken();
               res.status(200).json({ message: "Login Sucess", token, adminName: admin.name });
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
     getUsers: async (req, res) => {
          try {
               const userData = await User.find({});

               if (userData) {
                    // console.log(userData[0]);
                    return res.status(200).json({ message: "Sucess", userData });
               } else {
                    return res.status(500).json({ message: "didnt got users from database" });
               }
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
     updateUserStatus: async (req, res) => {
          try {
               console.log(req.body);
               const status = !req.body.active;
               console.log(status);
               const userStatus = await User.findOneAndUpdate({ phone: req.body.phone }, { $set: { active: status } });
               if (!userStatus) return res.status(500).json({ message: "didn't update user data" });
               const userData = await User.find({});
               return res.status(200).json({ message: "UserUpdated", userData, userStatus });
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
     updateUser: async (req, res) => {
          console.log(req.body);
          const { _id, name, email, phone, active } = req.body;
          try {
               console.log(req.body);

               const updatedUser = await User.findOneAndUpdate(
                    { _id: ObjectId(_id) },
                    {
                         $set: {
                              name: name,
                              email: email,
                              phone: phone,
                              active: active,
                         },
                    }
               );
               if (!updatedUser) return res.status(500).json({ message: "didn't update user" });
               const userData = await User.find({});
               return res.status(200).json({ message: "User Updated", userData });
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
     deleteUser: async (req, res) => {
          try {
               const deletedUser = await User.remove({ phone: req.body.phone });
               if (!deletedUser) return res.status(500).json({ message: " User didn't deleted" });
               const userData = await User.find({});
               return res.status(200).json({ message: "User Deleted", userData });
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
};
