import React, { useEffect } from "react";
import { Table, IconButton, Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import CartImage from "../../Cart/components/CartTable/components/CartImage";
import DeleteIcon from "@mui/icons-material/Delete";
import { getWishlist, deleWishlist } from "../../../../utlis/Constants";
import { setWishlist, setUserData } from "../../../../Redux";
import axios from "axios";
import Swal from "sweetalert2";
import Title from "../../User/Components/Title";


const WishlistTable = () => {
     const dispatch = useDispatch();
     const user = localStorage.getItem("user");

     const wishlist = useSelector((state) => state.wishlist.value);
     console.log(wishlist + "wislist");

     useEffect(() => {
          axios.post(getWishlist, { user: user }, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setWishlist({ wishlist: response.data.wishlistData }));
                    dispatch(setUserData({ userData: response.data.userData }));
               })
               .catch((error) => {
                    console.log(error);
               });
     }, [user,dispatch]);

     const Delete = (obj) => {
          Swal.fire({
               title: "Are You Sure?",
               text: "Do You Want To  Remove This Item From WishList !",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, Remove!",
          }).then((result) => {
               if (result.isConfirmed) {
                    const productId = obj;
                    const data = { user, productId };
                    console.log(data);
                    axios.post(deleWishlist, data, { headers: { "Content-Type": "application/json" } })
                         .then((response) => {
                              dispatch(setWishlist({ wishlist: response.data.wishlistData }));
                              dispatch(setUserData({ userData: response.data.userData }));
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "success",
                                   title: response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   height: "5rem",
                                   width: "15rem",
                              });
                         })
                         .catch((error) => {
                              console.log(error);
                         });
               }
          });
     };

     return (

         
          <>
          <Title title={"Wishlist"}/>
           {wishlist.length>0?
          <TableContainer  component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                         <TableRow>
                              <TableCell>Item</TableCell>
                              <TableCell align="right"></TableCell>
                              <TableCell align="center">Price</TableCell>
                              <TableCell align="left">SubCategory</TableCell>
                              <TableCell align="left">Type</TableCell>
                              <TableCell align="left"></TableCell>
                         </TableRow>
                    </TableHead>
                    <TableBody>
                         {wishlist?.map((obj) => (
                              <TableRow key={obj._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                   <TableCell component="th" scope="obj">
                                        <CartImage image={obj.Image1} />
                                   </TableCell>
                                   <TableCell align="left">
                                        {" "}
                                        <Typography variant="body2">{obj.Description}</Typography>{" "}
                                   </TableCell>
                                   <TableCell align="center">{obj.SellingPrice}</TableCell>
                                   <TableCell align="left">{obj.SubCategory}</TableCell>
                                   <TableCell align="left">{obj.Type}</TableCell>
                                   <TableCell align="left">
                                        <IconButton
                                             color="error"
                                             onClick={() => {
                                                  Delete(obj._id);
                                             }}
                                        >
                                             <DeleteIcon />
                                        </IconButton>{" "}
                                   </TableCell>
                              </TableRow>
                         ))}
                    </TableBody>
               </Table>
          </TableContainer>:<Typography variant="h2">No Products In Wishlist</Typography>}
          </>
     );
};
export default WishlistTable;
