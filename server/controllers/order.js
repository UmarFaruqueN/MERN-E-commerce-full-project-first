const { ObjectId } = require("mongodb");
const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");

module.exports = {
     getAllOrder: async (req, res) => {
          console.log("getALLOrder");
          try {
               const orderData = await Order.aggregate([
                    {
                         $project: {
                              _id: 1,
                              name: 1,
                              total: 1,
                              paymentType: 1,
                              orderStatus: 1,
                              orderTime: 1,
                              weekNumber: 1,
                              statusTime: 1,
                              month: 1,
                         },
                    },
               ]);
               if (orderData) {
                    const allOrders = orderData.reverse();
                    res.status(200).json({
                         message: " Orders Fetched Successfully",
                         allOrders,
                    });
               } else {
                    return res.status(500).json({ message: "didnt got Orders from database" });
               }
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
     addOrder: async (req, res) => {
          console.log("started Add order");
          const data = req.body;
          let removeCart = null;

          const details = {
               userId: data.address.user,
               name: data.address.name,
               phone: data.address.phone,
               address: data.address.address,
               products: data.products,
               subtotal: data.subtotal,
               shipping: data.shipping,
               discount: data.discount,
               total: data.total,
               paymentType: data.paymentType,
               orderTime: data.orderTime,
               orderStatus: "User Ordered",
               statusTime: data.orderTime,
               day: data.orderDay,
               month: data.orderMonth,
               weekNumber: data.weekNumber,
          };

          try {
               if (data.type === "Cart") {
                    removeCart = await User.findOneAndUpdate(
                         { _id: ObjectId(data.address.user) },
                         {
                              $set: { cartProducts: [] },
                         }
                    );
                    console.log(removeCart);
               }
               if (removeCart || data.type === "BuyNow") {
                    const newOrder = await Order.create(details);
                    if (newOrder) {
                         const allOrder = await Order.find({ userId: data.address._id });
                         const orderData = allOrder.reverse();
                         if (orderData) {
                              return res.status(200).json({ message: "Order Created..", orderData });
                         }
                         return res.status(500).json({ message: "No Order found in DataBase " });
                    }
                    return res.status(500).json({ message: "Try Again After Some Thing " });
               }
          } catch (error) {
               console.log(error);
               return res.status(500).json({ message: "Something went wrong           " });
          }
     },
     getOrder: async (req, res) => {
          console.log("started get Order");
          const { user } = req.body;
          console.log(user);

          try {
               const allOrder = await Order.find({ userId: user });
               console.log(allOrder);
               if (allOrder) {
                    const orderData = await allOrder.reverse();
                    console.log(orderData[0]);
                    return res.status(200).json({ message: "Order fetched", orderData });
               }
               return res.status(500).json({ message: "No Order found in DataBase " });
          } catch (error) {
               console.log(error);
               return res.status(500).json({ message: "Something went wron " });
          }
     },
     cancelOrder: async (req, res) => {
          const { _id, userId, orderDate } = req.body;

          try {
               const order = await Order.findOneAndUpdate(
                    { _id: ObjectId(_id) },
                    { $set: { orderStatus: "User Cancelled", statusTime: orderDate } }
               );
               if (order) {
                    const allOrder = await Order.find({ userId: userId });
                    if (allOrder) {
                         console.log(allOrder[0]);
                         const orderData = allOrder.reverse();
                         return res.status(200).json({ message: "Order Cancelled", orderData });
                    }
               }
          } catch (error) {
               console.log(error);
               return res.status(500).json({ message: "Something went wrong" });
          }
     },
     updateOrder: async (req, res) => {
          const { _id, status, updateDate } = req.body;

          console.log(_id);
          try {
               const updateOrder = await Order.findOneAndUpdate(
                    { _id: ObjectId(_id) },
                    { $set: { orderStatus: status, statusTime: updateDate } }
               );
               if (updateOrder) {
                    const orderData = await Order.find();
                    if (orderData) {
                         const allOrders = orderData.reverse();
                         res.status(200).json({
                              message: " Status Updated Successfully",
                              allOrders,
                         });
                    } else {
                         return res.status(500).json({ message: " Status didnt Updated" });
                    }
               }
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
     getSales: async (req, res) => {
          console.log("getSales");
          try {
               const Users = await User.find();
               const Products = await Product.find();
               const Orders = await Order.find({ orderStatus: "User Ordered" });
               const Sales = await Order.find({ orderStatus: "Item Delivered" });
               const Shipped = await Order.find({ orderStatus: "Item Shipped" });
               const Cancelled = await Order.find({ orderStatus: "User Cancelled" });
               const Data = [
                    {
                         name: "Users",
                         count: Users.length,
                    },
                    {
                         name: "Products",
                         count: Products.length,
                    },
                    {
                         name: "Orders",
                         count: Orders.length,
                    },
                    {
                         name: "Sales",
                         count: Orders.length,
                    },
                    {
                         name: "Shipped",
                         count: Shipped.length,
                    },
                    {
                         name: "Cancelled",
                         count: Cancelled.length,
                    },
               ];

               console.log(Data);
               res.status(200).json({
                    message: " Data Fetched Successfully",
                    Orders,
                    Sales,
                    Shipped,
                    Cancelled,
                    Data,
               });
          } catch (error) {
               console.log(error);
          }
     },
};
