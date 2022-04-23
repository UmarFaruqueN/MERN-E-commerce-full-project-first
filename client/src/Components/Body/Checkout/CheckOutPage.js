import { Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../User/Components/Title";

import AddAddress from "./components/AddAddress";
import Address from "./components/Address";
import Buttons from "./components/Buttons";
import CancelCheckout from "./components/CancelCheckout";
import Details from "./components/Details";
import PayPalButton from "./components/PayPalButton";
import PlaceOrder from "./components/PlaceOrder";
import RazorPayButton from "./components/RazorPayButton";
import TitleBar from "./components/TitleBar";
import { getAddress, getUser } from "../../../utlis/Constants";
import { setAddress, setUserData } from "../../../Redux";

const CheckOutPage = () => {
     const dispatch = useDispatch();
     const user = localStorage.getItem("user");
     useEffect(() => {
          axios.post(getUser, { user: user }, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setUserData({ userData: response.data.userData }));
               })
               .catch((err) => {
                    console.log(err);
                    console.log(err?.response?.data?.message);
               });
          axios.post(getAddress, { user: user }, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setAddress({ address: response.data.allAddress }));
               })
               .catch((err) => {
                    console.log(err);
                    console.log(err?.response?.data?.message);
               });
     }, [user,dispatch]);


     const addressData = useSelector((state) => state.address.value);
     const [disabled, setDisabled] = useState(false);
     const cartData = useSelector((state) => state.cart.value);
     const [viewAll, setViewAll] = useState(true);
     const [viewPayPal, setViewPayPal] = useState(false);
     const [viewRazorPay, setViewRazorPay] = useState(false);
     const [add, setAdd] = useState(false);
     const [showAdd, setShowAdd] = useState(true);
     const [select, setSelect] = useState(false);
     const [order, setOrder] = useState(false);
     const [localAddress, setLocalAddress] = useState({
          _id: "",
          user: "",
          name: "",
          phone: "",
          email: "",
          address: "",
          street: "",
          city: "",
          pin: "",
          distric: "",
          state: "",
     });

     const addAddress = () => {
          setAdd(true);
          setShowAdd(false);
          setSelect(false);
          setOrder(false);
     };

     const addedAddress = () => {
          setAdd(false);
          setShowAdd(true);
     };

     const selectAddress = () => {
          setSelect(true);
          setShowAdd(false);
          setOrder(false);
     };

     const changeAddress = () => {
          setAdd(false);
          setDisabled(false);
          setShowAdd(true);
          setSelect(false);
          setOrder(false);
     };

     const confirmAddress = () => {
          setOrder(true);
          setDisabled(true);
     };

     const Cancel = () => {
          setViewAll(true);
          setViewPayPal(false);
          setViewRazorPay(false);
     };

     return (
          <>
               <Box pt={13}>
                    <Container>
                         <Title title={viewPayPal || viewRazorPay ? "Payment" : "CheckOut"} />
                         <Grid container pt={3} spacing={5}>
                              <Grid md={7} item sx={{ display: "flex", flexDirection: "column" }}>
                                   {viewAll ? (
                                        <>
                                             <Grid item>
                                                  {add ? <AddAddress addedAddress={addedAddress} /> : ""}
                                                  {add ? (
                                                       ""
                                                  ) : (
                                                       <TitleBar
                                                            number={"01"}
                                                            title={"DELIVERY ADDRESS"}
                                                            btn={true}
                                                            addAddress={addAddress}
                                                       />
                                                  )}
                                                  {showAdd ? (
                                                       <Address
                                                            selectAddress={selectAddress}
                                                            setAddress={setLocalAddress}
                                                            Data={addressData}
                                                       />
                                                  ) : (
                                                       ""
                                                  )}
                                                  {select ? (
                                                       <>
                                                            <Address checked={true} Data={[localAddress]} />{" "}
                                                            <Buttons
                                                                 disabled={disabled}
                                                                 confirmAddress={confirmAddress}
                                                                 changeAddress={changeAddress}
                                                                 Data={localAddress}
                                                            />
                                                       </>
                                                  ) : (
                                                       ""
                                                  )}

                                                  {order ? (
                                                       <PlaceOrder
                                                            cartData={cartData}
                                                            userData={localAddress}
                                                            setViewAll={setViewAll}
                                                            setViewPayPal={setViewPayPal}
                                                            setViewRazorPay={setViewRazorPay}
                                                       />
                                                  ) : (
                                                       ""
                                                  )}
                                             </Grid>
                                        </>
                                   ) : (
                                        ""
                                   )}

                                   {viewPayPal ? <PayPalButton userData={localAddress} /> : ""}
                                   {viewRazorPay ? <RazorPayButton userData={localAddress} /> : ""}
                                   {viewAll ? (
                                        ""
                                   ) : (
                                        <Button sx={{ mb: 2 }} variant="contained" onClick={Cancel} color="warning">
                                             {" "}
                                             Change Payment Method Or Delivery Address
                                        </Button>
                                   )}

                                   <CancelCheckout />
                              </Grid>

                              <Grid md={4} item>
                                   <Details />
                              </Grid>
                         </Grid>
                    </Container>
               </Box>
          </>
     );
};

export default CheckOutPage;
