import React from "react";
import { Grid, IconButton, Button } from "@mui/material";
import { OrangeButton } from "../../../Common";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import axios from "axios";

import { addToCart, addWishlist } from "../../../../utlis/Constants";
import { setUserData, setWishlist, setLoginForm, setCart, setCheckout } from "../../../../Redux";
import { useNavigate } from "react-router-dom";

const ButtonConfig = (props) => {
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const user = localStorage.getItem("user");
     const count = props.count;
     const temp = props.data;
     const data = { ...temp, user, count };

     const AddToCart = () => {
          if (user) {
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
               dispatch(setLoginForm({ loginForm: true }));
          }
     };

     const Wishlist = (obj) => {
          const data = { ...obj, user };
          if (user) {
               console.log(data);
               axios.post(addWishlist, data, { headers: { "Content-Type": "application/json" } })
                    .then((response) => {
                         dispatch(setWishlist({ wishlist: response.data.wishlistData }));
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
                              icon: "error",
                              title: err.response.data.message,
                              showConfirmButton: false,
                              timer: 1500,
                              width: "15rem",
                         });
                    });
          } else {
               dispatch(setLoginForm({ loginForm: true }));
          }
     };

     const BuyNow = () => {
          dispatch(
               setCheckout({
                    checkout: {
                         products: [data],
                         subtotal: (data.SellingPrice-data.Offer)*count,
                         shipping: 100,
                         type:"BuyNow",
                         discount: 0,
                         total: (data.SellingPrice-data.Offer)*count ,
                         address: {},
                    },
               })
          );
          navigate("/checkOut");
     };

     return (
          <>
               <Grid pl={3} container spacing={2}>
                    <Grid item>
                         {" "}
                         <IconButton>
                              <Button size="medium" variant="outlined" color="secondary" onClick={AddToCart}>
                                   {" "}
                                   <AddShoppingCartOutlinedIcon />
                                   Add to cart
                              </Button>
                         </IconButton>
                    </Grid>
                    <Grid item>
                         {" "}
                         <IconButton onClick={BuyNow}>
                              <OrangeButton title={"Buy Now"} />
                         </IconButton>
                    </Grid>
                    <Grid item>
                         <Grid item>
                              <IconButton
                                   onClick={() => {
                                        Wishlist(props.data);
                                   }}
                                   color="error"
                              >
                                   {" "}
                                   <FavoriteIcon sx={{ fontSize: "40px" }} />
                              </IconButton>
                         </Grid>
                    </Grid>
               </Grid>
          </>
     );
};

export default ButtonConfig;
