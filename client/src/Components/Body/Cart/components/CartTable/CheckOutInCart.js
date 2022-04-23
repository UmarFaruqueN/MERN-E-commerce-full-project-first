import React, { useState } from "react";
import { Grid, Typography, Button, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCheckout } from "../../../../../Redux/checkout/checkout";

const CheckOutInCart = (props) => {
     const dispatch = useDispatch()
     const [err, setErr] = useState("");
     const navigate = useNavigate();


     const Checkout = () => {
          if (props.total === 0) {
               setErr("Add Products To CheckOut");
          } else {

               dispatch(
                    setCheckout({
                         checkout: {
                              products: props.cartData,
                              subtotal: props.total,
                              shipping: 0,
                              type:"Cart",
                              discount: 0,
                              total: props.total ,
                              address: {},
                         },
                    })
               );
               navigate("/checkOut");
          }
     };
     return (
          
          <>
          {props.cartData.length>0?(
               <Grid
                    item
                    sx={{
                         backgroundColor: "secondary.light",
                         pl: 3,
                         pt: 3,
                         pr: 3,
                         ml: 2,
                         borderRadius: "20px",
                    }}
               >
                    <Grid item>
                         <Typography variant="h2"> Summary</Typography>
                    </Grid>

                    <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
                         <Grid item>
                              {" "}
                              <Typography pt={2} variant="h4">
                                   {" "}
                                   SubTotal
                              </Typography>
                         </Grid>
                         <Grid item>
                              {" "}
                              <Typography pt={2} variant="h4">
                                   {" "}
                                   ₹{props.total} /-
                              </Typography>
                         </Grid>
                    </Grid>
                    <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
                         <Grid item>
                              {" "}
                              <Typography pt={2} variant="h4">
                                   {" "}
                                   Shipping
                              </Typography>
                         </Grid>
                         <Grid item>
                              {" "}
                              <Typography pt={2} variant="h4">
                                   {" "}
                                   free
                              </Typography>
                         </Grid>
                    </Grid>

                    <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
                         <Grid item>
                              {" "}
                              <Typography pt={2} variant="h4">
                                   {" "}
                                   Total
                              </Typography>
                         </Grid>
                         <Grid item>
                              {" "}
                              <Typography pt={2} variant="h4">
                                   {" "}
                                   ₹{props.total} /-
                              </Typography>
                         </Grid>
                    </Grid>
                    <Grid item sx={{ display: "flex", justifyContent: "space-around", pb: 1 }}>
                         {" "}
                         <Typography pt={2} color="error" variant="h4">
                              {" "}
                              {err}
                         </Typography>
                    </Grid>
                    <Grid item sx={{ display: "flex", justifyContent: "space-around", pb: 3 }}>
                         <Button onClick={Checkout} variant="contained" color="secondary">
                              Check Out
                         </Button>
                    </Grid>
               </Grid>
          ):""}
          </>
     );
};

export default CheckOutInCart;
