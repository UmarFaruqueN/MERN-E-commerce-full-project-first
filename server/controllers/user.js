const User = require("../models/user");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const serviceSSID = "VA68f7d8d4ec396d16e5886f5f2ed07da9";
const accountSSID = "ACa177557bacd7c7b44f9396397e2922cd";
const authToken = "3fdef5e9103bb0a89fce1c70b65ab136";
const client = require("twilio")(accountSSID, authToken);
const emailValidation = require("nodejs-email-validation");

module.exports = {
     userSignup: async (req, res) => {
          try {
               req.body.password = await bcrypt.hash(req.body.password, 10);
               console.log(req.body.password);
               console.log("started try");
               const userEmail = await User.findOne({ email: req.body.email });
               const userPhone = await User.findOne({ phone: req.body.phone });

               if (userEmail) return res.status(400).json({ message: "This Email Is Already Registered" });
               if (userPhone) return res.status(400).json({ message: "This Phone Is Already Registered" });

               console.log("new user");
               const newUser = await User.create(req.body);
               res.status(200).json({ message: "Acoount Created Successfully", userData: newUser });
          } catch (error) {
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     userLogin: async (req, res) => {
          try {
               console.log(req.body.password);
               console.log("started try");
               const user = await User.findOne({ email: req.body.email });
               if (user) {
                    const result = await bcrypt.compare(req.body.password, user.password);
                    console.log(result);
                    if (result) {
                         const token = user.generateAuthToken();
                         console.log(token);
                         return res
                              .status(200)
                              .json({ message: "Login Sucess", token, userName: user.name, userId: user._id, user });
                    }

                    return res.status(500).json({ message: "Password Doesnot Match" });
               }
               return res.status(500).json({ message: "No User Found" });
          } catch (error) {
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     mobileLogin: async (req, res) => {
          console.log(req.body);
          try {
               const user = await User.findOne({ phone: req.body.phone });
               if (!user) return res.status(404).json({ message: "User Not Found", userStatus: true });
               console.log("userfound");
               if (!user.active) return res.status(404).json({ message: "User Blocked", userStatus: user.active });
               const send = await client.verify.services(serviceSSID).verifications.create({
                    to: `+91${req.body.phone}`,
                    channel: "sms",
               });

               if (!send) return res.status(404).json({ message: "Try Again Later", userStatus: true });

               return res.status(200).json({ message: "OTP Send to your mobile number" });
          } catch (error) {
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong", userStatus: true });
          }
     },
     otpLogin: async (req, res) => {
          console.log(req.body.otp);
          try {
               const isOTP = await client.verify.services(serviceSSID).verificationChecks.create({
                    to: `+91${req.body.phone}`,
                    code: req.body.otp,
               });
               if (isOTP.valid) {
                    const user = await User.findOne({ phone: req.body.phone });
                    const token = user.generateAuthToken();
                    console.log(user);
                    return res
                         .status(200)
                         .json({ message: "Login Sucess", token, userName: user.name, userId: user._id, user });
               } else {
                    return res.status(500).json({ message: "something went wrong" });
               }
          } catch (error) {
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     getUser: async (req, res) => {
          const { user } = req.body;
          try {
               const userData = await User.findOne({ _id: ObjectId(user) });
               if (userData) {
                    return res.status(200).json({ message: " Address fetched", userData });
               }
               return res.status(500).json({ message: "No user found" });
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     editName: async (req, res) => {
          console.log(req.body);
          const { update, user } = req.body;
          try {
               if (update === null) {
                    return res.status(500).json({ message: "Same As Old Name" });
               }

               const editName = await User.findOneAndUpdate(
                    { _id: ObjectId(user) },
                    {
                         $set: { name: update },
                    }
               );

               if (editName) {
                    const userData = await User.findOne({ id: ObjectId(user) });
                    return res.status(200).json({ message: "Name Updated", userData });
               }
               return res.status(500).json({ message: "No user found" });
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     editPhone: async (req, res) => {
          console.log(req.body);
          const { update, user } = req.body;
          try {
               if (update === null) {
                    return res.status(500).json({ message: "Change Number" });
               }
               if (update.length > 10) {
                    return res.status(500).json({ message: "Maximum 10 Numbers Allowed " });
               }
               if (update.length < 10) {
                    return res.status(500).json({ message: "Minimum 10 Numbers Neede " });
               }
               const checkPhone = await User.findOne({ phone: update });
               if (checkPhone) {
                    return res.status(500).json({ message: "This Phone is Already Registered " });
               }

               const editName = await User.findOneAndUpdate(
                    { _id: ObjectId(user) },
                    {
                         $set: { phone: update },
                    }
               );

               if (editName) {
                    const userData = await User.findOne({ id: ObjectId(user) });
                    return res.status(200).json({ message: "Phone Updated", userData });
               }
               return res.status(500).json({ message: "No user found" });
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     editEmail: async (req, res) => {
          console.log(req.body);
          const { update, user } = req.body;
          try {
               if (update === null) {
                    return res.status(500).json({ message: "Change Email" });
               }

               const validateEmail = await emailValidation.validate(update);
               if (validateEmail) {
                    const checkEmail = await User.findOne({ email: update });
                    if (checkEmail) {
                         return res.status(500).json({ message: "This Email is Already Registered " });
                    }
                    const editName = await User.findOneAndUpdate(
                         { _id: ObjectId(user) },
                         {
                              $set: { email: update },
                         }
                    );

                    if (editName) {
                         const userData = await User.findOne({ id: ObjectId(user) });
                         return res.status(200).json({ message: "Email Updated", userData });
                    }
               }
               return res.status(500).json({ message: "Enter Valid Email" });
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     editPassword: async (req, res) => {
          console.log(req.body);
          const { update, user, checkPass } = req.body;
          console.log();
          try {
               const userData = await User.findOne({ _id: ObjectId(user) });
               if (checkPass && userData) {
                    const result = await bcrypt.compare(update, userData.password);
                    if (result) return res.status(200).json({ message: "Password Correct" });
                    return res.status(500).json({ message: "Password Incorrect" });
               }
               const result = await bcrypt.compare(update.password, userData.password);
               if (result) {
                    return res.status(500).json({ message: "Same As Old Password" });
               }
               const password = await bcrypt.hash(update.password, 10);
               const updated = await User.findOneAndUpdate({ _id: ObjectId(user) }, { $set: { password: password } });
               if (updated) return res.status(200).json({ message: "Password Updated", userData });
          } catch (error) {
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
};
