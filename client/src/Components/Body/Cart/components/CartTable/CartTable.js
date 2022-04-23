import React from "react";
import {
     Table,
     TableBody,
     TableCell,
     TableContainer,
     TableHead,
     TableRow,
     Paper,
     IconButton,
     Typography,
     Divider,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

import CartProdctIncrement from "./components/CartProdctIncrement";
import CartImage from "./components/CartImage";
import { setCart, setUserData } from "../../../../../Redux";
import { deleCart } from "../../../../../utlis/Constants";

const CartTable = (props) => {
     const dispatch = useDispatch();

     const Delete = (data) => {
          props.setCount(100)
          Swal.fire({
               title: "Are You Sure?",
               text: "Do You Want To  Remove This Item From Cart !",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, Remove!",
          }).then((result) => {
               if (result.isConfirmed) {
                    console.log(data);
                    axios.post(deleCart, data, { headers: { "Content-Type": "application/json" } })
                         .then((response) => {
                              props.setCount(200)
                              props.setTotal(response.data.cartTotal[0].total);
                              dispatch(setCart({ cart: response.data.cartData }));
                              dispatch(setUserData({ userData: response.data.userData }));
                              console.log(props.cartData);
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "success",
                                   title: response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   width: "15rem",
                              });
                              props.setCount(300)
                         })
                         .catch((err) => {
                              console.log(err);
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "error",
                                   title: err.response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   width: "15rem",
                              });
                         });
               }
          });
     };

     return (
          <>
               {props.cartData.length > 0 ? (
                    <TableContainer component={Paper}>
                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead>
                                   <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                        <TableCell align="right"></TableCell>
                                   </TableRow>
                              </TableHead>
                              <TableBody>
                                   {props.cartData?.map((obj) => (
                                        <TableRow key={obj._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                             <TableCell component="th" scope="obj">
                                                  <CartImage image={obj.Image1} />
                                             </TableCell>
                                             <TableCell align="left">
                                                  {" "}
                                                  <Typography variant="body2">{obj.Description}</Typography>{" "}
                                             </TableCell>
                                             <TableCell align="right">{obj.Price}</TableCell>

                                             <TableCell align="center">
                                                  <CartProdctIncrement setCount={props.setCount}  cartData={obj} />
                                             </TableCell>

                                             <TableCell align="right">{obj.Price * obj.count} </TableCell>
                                             <TableCell align="right">
                                                  <IconButton
                                                       color="error"
                                                       onClick={() => {
                                                            Delete(obj);
                                                       }}
                                                  >
                                                       <DeleteIcon />
                                                  </IconButton>{" "}
                                             </TableCell>
                                        </TableRow>
                                   ))}
                              </TableBody>
                         </Table>
                    </TableContainer>
               ) : (
                    <Typography variant="h2">
                         {" "}
                         <Divider />
                         No Products In Cart
                    </Typography>
               )}
          </>
     );
};

export default CartTable;
