import { Divider, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CouponCode from "./CouponCode";

const LeftBox = (props) => {
     const navigate = useNavigate();
     const [account, setAccount] = useState(props.account);
     const [order, setOrder] = useState(props.order);

     const Account = () => {
          setAccount(true);
          setOrder(false);
          navigate("/profile");
     };

     const Order = () => {
          setAccount(false);
          setOrder(true);
          navigate("/myOrders");
     };

     return (
          <>
               <Grid item md={4}>
                    <Grid item height="15    0px" sx={{ backgroundColor: "#F5F7ff", p: 4 }}>
                         <Grid item>
                              {" "}
                              {account ? (
                                   <IconButton disableRipple={true} onClick={Account}>
                                        <Typography  color="secondary" variant="h4">
                                             Account Information
                                        </Typography>
                                   </IconButton>
                              ) : (
                                   <IconButton disableRipple={true} onClick={Account}>
                                        <Typography  color="text.disabled" variant="h4">
                                             Account Information
                                        </Typography>
                                   </IconButton>
                              )}
                         </Grid>
                         <Grid item>
                              {" "}
                              {order ? (
                                   <IconButton disableRipple={true} onClick={Order}>
                                        <Typography pb={2} color="secondary" variant="h4">
                                             My Orders
                                        </Typography>
                                   </IconButton>
                              ) : (
                                   <IconButton disableRipple={true} onClick={Order}>
                                        <Typography pb={2} color="text.disabled" variant="h4">
                                             My Orders
                                        </Typography>
                                   </IconButton>
                              )}
                         </Grid>
                         <Grid item>
                              {" "}
                              <Divider />{" "}
                         </Grid>

                         <CouponCode/>
                    </Grid>
               </Grid>
          </>
     );
};

export default LeftBox;
