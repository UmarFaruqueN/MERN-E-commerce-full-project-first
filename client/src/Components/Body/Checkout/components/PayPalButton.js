import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import { addOrder } from "../../../../utlis/Constants";
import { setOrder, setCart, setCheckout } from "../../../../Redux";
import { useNavigate } from "react-router-dom";

const PayPalButton = (props) => {
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const checkout = useSelector((state) => state.checkout.value);
     const address = props.userData;
     // const price = (props.checkout.total/75.71)

     const Submit = () => {
          
          const tempDate =new Date()
          const orderDate = tempDate.toLocaleString();
          const orderDay=tempDate.getDate();
          const orderMonth=tempDate.getMonth();
          console.log(orderDate);
          const data = { ...checkout, address, paymentType: "PayPal", orderTime: orderDate,orderDay, orderMonth };
          console.log();
          console.log(data);
          axios.post(addOrder, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log(response.data.orderData);
                    console.log();
                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         title: response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    });

                    dispatch(setOrder({ order: response.data.orderData }));
                    dispatch(setCart({ cart: [] }));
                    dispatch(setCheckout({ checkout: {} }));
                    setTimeout(() => {
                         navigate("/myOrders");
                    }, 2000);
               })
               .catch((error) => {
                    console.log(error.response.data.message);
               });
     };
     return (
          <>
               <PayPalButtons
                    createOrder={(data, actions) => {
                         return actions.order.create({
                              purchase_units: [
                                   {
                                        amount: {
                                             value: "1.99",
                                        },
                                   },
                              ],
                              
                         });
                    }}
                    onApprove={(data, actions) => {
                         return actions.order.capture().then((details) => {
                            console.log(details); 
                            Submit()
                         });
                    }}
               />
          </>
     );
};

export default PayPalButton;
