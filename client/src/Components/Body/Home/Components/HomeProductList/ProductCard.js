import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useDispatch} from "react-redux";

import { addToCart } from "../../../../../utlis/Constants";
import { setCart } from "../../../../../Redux/cart/cart";
import { setLoginForm } from "../../../../../Redux/loginForm/loginForm";
import { setUserData } from "../../../../../Redux/userData/userData";
const ProductCard = (props) => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const user = localStorage.getItem("user");;

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
               dispatch(setLoginForm({ loginForm: true }));
          }
     };
     return (
          <>
               {props.data?.map((obj) => (
                    <Grid key={obj._id} item>
                         <Card sx={{ width: "192px", height: "360px", borderRadius: "0" }}>
                              <CardMedia
                                   component="img"
                                   alt="camera"
                                   height="150"
                                   width="150"
                                   src={obj.Image1}
                                   onClick={() => {
                                        navigate("/product/" + obj._id);
                                   }}
                                   sx={{ cursor: "pointer" }}
                              />

                              <CardContent>
                                   <Typography
                                        onClick={() => {
                                             navigate("/product/" + obj._id);
                                        }}
                                        sx={{ cursor: "pointer" }}
                                        variant="h4"
                                        component="div"
                                   >
                                        {obj.ProductName}
                                   </Typography>
                                   <Typography variant="body1" color="text" component="div" marginTop="1px">
                                        {obj.Description}
                                   </Typography>
                                   <Typography variant="h5" color="error" component="div" marginTop="1px">
                                        {" "}
                                        {obj.Offer===0?<br/>:
                                        <del> Price ₹ {obj.SellingPrice}</del>}
                                   </Typography>

                                   <Typography variant="h3" marginTop="1px" component="div">
                                       Price ₹ {obj.SellingPrice-obj.Offer}
                                   </Typography>

                                   <CardActions sx={{ display: "flex", marginTop: "1px", justifyContent: "center" }}>
                                        <Button
                                             size="small"
                                             variant="outlined"
                                             color="secondary"
                                             onClick={() => {
                                                  Submit(obj);
                                             }}
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
          </>
     );
};

export default ProductCard;
