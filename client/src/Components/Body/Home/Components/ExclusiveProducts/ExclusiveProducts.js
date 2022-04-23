import React, { useRef } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { setCart } from "../../../../../Redux/cart/cart";
import { setLoginForm } from "../../../../../Redux/loginForm/loginForm";
import {setUserData} from "../../../../../Redux/userData/userData"
import { addToCart } from "../../../../../utlis/Constants";

const ExclusiveProducts = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const tempData = useSelector((state) => state.products.value);
     const user = localStorage.getItem("user");

     const Submit = (obj) => {
          if (user) {
               const count = 1;
               const data = { ...obj, user, count };
               console.log(data);
               axios.post(addToCart, data, { headers: { "Content-Type": "application/json" } })
                    .then((response) => {
                         dispatch(setCart({ cart: response.data.cartData }));
                         dispatch(setUserData({ userData: response.data.userData }));
                         Swal.fire({
                              position: "bottom-end",
                              icon: "success",
                              title: response.data.message,
                              showConfirmButton: false,
                              timer: 1500,
                              width: "15rem",
                         });
                    })
                    .catch((err) => {
                         console.log(err);
                         console.log(err.response.data.message);
                         Swal.fire({
                              position: "bottom-end",
                              icon: "success",
                              title: err.response.data.message,
                              showConfirmButton: false,
                              timer: 1500,
                              width: "15rem",
                         });
                    });
          } else {
               dispatch(setLoginForm({loginForm:true}));
          }
     };

     const ref = useRef(null);
     const scroll = (scrollOffset) => {
          ref.current.scrollLeft += scrollOffset;
     };
     return (
          <>
               <Box
                    sx={{
                         width: "100%",
                         height: "100%",
                         marginTop: "22px",
                         borderRadius: "16px",
                         // backgroundColor: "#F5F7FF",
                    }}
               >
                    <Box
                         sx={{
                              width: "100%",
                              height: "30px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                         }}
                    >
                         <Box sx={{ flexGrow: 0.5 }} />
                         <Typography variant="h3">
                              {" "}
                              <u> Exclusive Products</u>
                         </Typography>
                         <Box sx={{ flexGrow: 11 }} />
                    <IconButton onClick={()=>navigate("/search")}>
                         <Typography variant="h4" sx={{ fontWeight: "600" }}>
                              {" "}
                              <u> See All Products </u>
                         </Typography>
                         </IconButton>
                         <Box sx={{ flexGrow: 0.5 }} />
                    </Box>

                    <Box sx={{ display: "flex" }}>
                         <Box sx={{ width: "4%", height: "380px", display: "flex", cursor: "pointer" }}>
                              <IconButton onClick={() => scroll(-20)}>
                                   {" "}
                                   <ArrowBackIosNewIcon />
                              </IconButton>{" "}
                         </Box>

                         <Box sx={{ width: "92%", display: "flex", justifyContent: "space-around", mt: 1 }}>
                              <Grid container wrap="nowrap" sx={{ overflow: "auto" }} spacing={1.5}>
                                   {tempData.map((obj) => (
                                        <Grid key={obj._id} item>
                                             <Card sx={{ width: "200px", height: "350px" }}>
                                                  <CardMedia
                                                       onClick={() => {
                                                            navigate("/product/" + obj._id);
                                                       }}
                                                       sx={{ cursor: "pointer", backgroundColor: "whitesmoke" }}
                                                       component="img"
                                                       alt="camera"
                                                       height="150"
                                                       width="150"
                                                       image={obj.Image1}
                                                  />

                                                  <CardContent>
                                                       <Typography
                                                            sx={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                 navigate("/product/" + obj._id);
                                                            }}
                                                            variant="h4"
                                                            component="div"
                                                       >
                                                            {obj.ModelNumber}
                                                       </Typography>
                                                       <Typography
                                                            variant="body1"
                                                            color="text"
                                                            component="div"
                                                            marginTop="1px"
                                                       >
                                                            {obj.Description}
                                                       </Typography>
                                                       <Typography
                                                                                                                   variant="h5"
                                                            color="error"
                                                            component="div"
                                                            marginTop="1px"
                                                       >
                                                            {" "}
                                                            {obj.Offer===0?<br/>:
                                                            <del> Price ₹ {obj.SellingPrice}</del>}
                                                       </Typography>

                                                       <Typography variant="h3" marginTop="1px" component="div">
                                                            ₹ {obj.SellingPrice-obj.Offer}
                                                       </Typography>

                                                       <CardActions
                                                            sx={{
                                                                 display: "flex",
                                                                 marginTop: "1px",
                                                                 justifyContent: "center",
                                                            }}
                                                       >
                                                            <Button
                                                                 onClick={() => {
                                                                      Submit(obj);
                                                                 }}
                                                                 size="small"
                                                                 variant="outlined"
                                                                 color="secondary"
                                                            >
                                                                 {" "}
                                                                 <AddShoppingCartOutlinedIcon />
                                                                 Add to cart
                                                            </Button>
                                                       </CardActions>
                                                  </CardContent>
                                             </Card>
                                        </Grid>
                                   ))}
                              </Grid>
                         </Box>

                         <Box sx={{ width: "4%", height: "360px", display: "flex" }}>
                              {" "}
                              <IconButton onClick={() => scroll(20)}>
                                   <ArrowForwardIosIcon />
                              </IconButton>
                         </Box>
                    </Box>
               </Box>
          </>
     );
};

export default ExclusiveProducts;
