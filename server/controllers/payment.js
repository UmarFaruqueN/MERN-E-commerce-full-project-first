require("dotenv").config();
const Razorpay = require("razorpay");
module.exports = {
     getRazorpayKey: (req, res) => {
          console.log("getrazorpay");
          res.send({ key: process.env.RAZORPAY_KEY_ID });
     },
     addOrderRazorpay: async (req, res) => {
          console.log("addrazorpay");
          console.log(process.env.RAZORPAY_KEY_ID);
          console.log(process.env.RAZORPAY_SECRET);
          try {
               const instance = new Razorpay({
                    key_id: process.env.RAZORPAY_KEY_ID,
                    key_secret: process.env.RAZORPAY_SECRET,
               });  

               const options = {
                    amount: req.body.amount,
                    currency: "INR",
               };

               const order = await instance.orders.create(options);
               if (!order) return res.status(500).send("some error");
               res.send(order);
          } catch (error) {
               console.log(error);
               res.send(error);
          }
     },
};
