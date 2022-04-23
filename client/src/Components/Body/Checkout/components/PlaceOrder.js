import React, { useState } from "react";
import { Grid, Typography, Button, Radio, Divider } from "@mui/material";
import TitleBar from "./TitleBar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import { addOrder } from "../../../../utlis/Constants";
import { setOrder, setCart, setCheckout } from "../../../../Redux";
import { useNavigate } from "react-router-dom";

const PlaceOrder = (props) => {
     const [cod, setCod] = useState(false);
     const [payPal, setPayPal] = useState(false);
     const [razorpay, setRazorpay] = useState(false);
     const [view, setView] = useState(true);
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const checkout = useSelector((state) => state.checkout.value);
     const address = props.userData;

     const Submit = () => {
          const tempDate =new Date()
          const orderDate = tempDate.toLocaleString();
          const orderDay=tempDate.getDate();
          const orderMonth=tempDate.getMonth();

          console.log(orderDate);
          const data = { ...checkout, address, paymentType: "COD", orderTime: orderDate,orderDay, orderMonth};
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
                    Swal.fire({
                         position: "bottom-end",
                         icon: "error",
                         title: error.response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    })
               });
     };

     const PayAndSubmit = () => {
          if (payPal) {
               props.setViewAll(false);
               props.setViewPayPal(true);
          }

          if(razorpay){
               props.setViewAll(false);
               props.setViewRazorPay(true);
          }
     };

     const Cod = () => {
          setCod(true);
          setView(false);
          setPayPal(false);
          setRazorpay(false);
     };
     const PayPal = () => {
          setPayPal(true);
          setView(false);
          setCod(false);
          setRazorpay(false);
     };
     const Razorpay = () => {
          setRazorpay(true);
          setView(false);
          setPayPal(false);
          setCod(false);
     };

     const Cancel = () => {
          setView(true);
          setRazorpay(false);
          setPayPal(false);
          setCod(false);
     };
     return (
          <>
               <TitleBar number={"02"} title={"PLACE ORDER"} />
               <Grid sx={{ display: "flex", flexDirection: "column", pt: 2, pb: 2 }}>
                    {view || payPal ? (
                         <Grid item sx={{ display: "flex", alignItems: "center" }}>
                              <Grid item>
                                   {" "}
                                   {payPal ? (
                                        <Radio color="secondary" checked={true} />
                                   ) : (
                                        <Radio onChange={PayPal} sx={{ color: "#0156ff" }} color="secondary" />
                                   )}
                              </Grid>
                              <Grid item>
                                   <Typography fontWeight="400" variant="h4" pl={3}>
                                        {" "}
                                        Pay With PayPal
                                   </Typography>{" "}
                              </Grid>
                         </Grid>
                    ) : (
                         ""
                    )}

                    {view || razorpay ? (
                         <Grid item sx={{ display: "flex", alignItems: "center" }}>
                              <Grid item>
                                   {" "}
                                   {razorpay ? (
                                        <Radio color="secondary" checked={true} />
                                   ) : (
                                        <Radio onChange={Razorpay} sx={{ color: "#0156ff" }} color="secondary" />
                                   )}
                              </Grid>
                              <Grid item>
                                   <Typography fontWeight="400" variant="h4" pl={3}>
                                        {" "}
                                        Pay With Razorpay
                                   </Typography>{" "}
                              </Grid>
                         </Grid>
                    ) : (
                         ""
                    )}
                    {view || cod ? (
                         <Grid item sx={{ display: "flex", alignItems: "center" }}>
                              <Grid item>
                                   {" "}
                                   {cod ? (
                                        <Radio color="secondary" checked={true} />
                                   ) : (
                                        <Radio onChange={Cod} sx={{ color: "#0156ff" }} color="secondary" />
                                   )}
                              </Grid>
                              <Grid item>
                                   <Typography fontWeight="400" variant="h4" pl={3}>
                                        {" "}
                                        Cash On Delivery
                                   </Typography>{" "}
                              </Grid>
                         </Grid>
                    ) : (
                         ""
                    )}
               </Grid>
               <Divider />
               <Grid item sx={{ display: "flex", justifyContent: "space-between" }} p={2}>
                    {cod || payPal || razorpay ? (
                         <Button onClick={Cancel} color="warning" variant="contained">
                              Change Payment Method
                         </Button>
                    ) : (
                         ""
                    )}
                    {payPal || razorpay ? (
                         <Button onClick={PayAndSubmit} color="success" variant="contained">
                              {" "}
                              Pay Now And Place Order
                         </Button>
                    ) : (
                         ""
                    )}
                    {cod ? (
                         <Button onClick={Submit} color="success" variant="contained">
                              {" "}
                              Place Order
                         </Button>
                    ) : (
                         ""
                    )}
               </Grid>
          </>
     );
};

export default PlaceOrder;
