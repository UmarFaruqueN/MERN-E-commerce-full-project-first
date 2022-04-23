import React, { useEffect } from "react";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import { getAllProducts, deleteProduct, setProducts, setCategory, setSubCategory, setType } from "./";
import { setOrders } from "../../Redux";

function ProductManagement() {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const allProducts = useSelector((state) => state.products.value);
     useEffect(() => {
          axios.get(getAllProducts, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log("success");
                    console.log(response.data.allProduct);
                    dispatch(setProducts({ products: response.data.allProduct }));
                    dispatch(setCategory({ category: response.data.allCategory }));
                    dispatch(setSubCategory({ subCategory: response.data.allSubCategory }));
                    dispatch(setType({ type: response.data.allType }));
                    dispatch(setOrders({orders:response.data.allOrders}))
               })
               .catch((error) => {
                    console.log(error);
               });
     }, [dispatch]);

     const DeleteProduct = (productData) => {
          Swal.fire({
               title: "Are you sure?",
               text: "You won't be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, delete it!",
          }).then((result) => {
               if (result.isConfirmed) {
                    axios.post(deleteProduct, productData, { headers: { "Content-Type": "application/json" } })
                         .then((response) => {
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "success",
                                   title: response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   width: "15rem",
                              });

                              dispatch(setProducts({ products: response.data.productData }));
                              console.log(allProducts);
                         })
                         .catch((err) => {
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "error",
                                   title: err.response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   width: "15rem",
                              });
                              console.log(err.response.data.message);
                         });
               }
          });
     };

     return (
          <>
               <TableContainer width="100%" component={Paper}>
                    <Table width="100%" aria-label="caption table">
                         <TableHead>
                              <TableRow>
                                   <TableCell sx={{ display: "flex", alignItems: "center", fontSize: "10px" }}>
                                        Product Name{" "}
                                        <IconButton
                                             color="secondary"
                                             variant="contained"
                                             onClick={() => {
                                                  navigate("/addProduct");
                                             }}
                                        >
                                             <AddIcon />
                                        </IconButton>
                                   </TableCell>
                                   <TableCell sx={{ fontSize: "10px" }} align="left">
                                        Images
                                   </TableCell>
                                   <TableCell sx={{ fontSize: "10px" }} align="left">
                                        Model Number
                                   </TableCell>
                                   <TableCell sx={{ fontSize: "10px" }} align="left">
                                        Category
                                   </TableCell>
                                   <TableCell sx={{ fontSize: "10px" }} align="left">
                                        SubCategory
                                   </TableCell>
                                   <TableCell sx={{ fontSize: "10px" }} align="left">
                                        Type
                                   </TableCell>
                                   <TableCell sx={{ fontSize: "10px" }} align="left">
                                        Price
                                   </TableCell>
                                   <TableCell sx={{ fontSize: "10px" }} align="left">
                                        Description
                                   </TableCell>
                                   <TableCell sx={{ fontSize: "10px" }} align="left">
                                        Stock
                                   </TableCell>
                                   <TableCell sx={{ fontSize: "10px" }} align="left">
                                        Delete
                                   </TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {allProducts?.map((obj) => (
                                   <TableRow key={obj._id}>
                                        <TableCell sx={{ fontSize: "8px" }} component="th" scope="row">
                                             {obj.ProductName}{" "}
                                             <IconButton
                                                  color="secondary"
                                                  variant="contained"
                                                  onClick={() => {
                                                       navigate("/editProduct"+obj._id);
                                                  }}
                                             >
                                                  <EditIcon sx={{ fontSize: "16px" }} />
                                             </IconButton>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "8px" }} align="left">
                                             <Grid container>
                                                  <Grid item md={10}>
                                                       {" "}
                                                       <img width="60px" height="40px" src={obj.Image1} alt="productimg" />
                                                       
                                                  </Grid>
                                                  <Grid item md={2}>
                                                  <IconButton
                                                  color="secondary"
                                                  variant="contained"
                                                  onClick={() => {
                                                       navigate("/editImage"+obj._id);
                                                  }}
                                             >
                                                  <EditIcon sx={{ fontSize: "16px" }} />
                                             </IconButton>
                                                  </Grid>
                                             </Grid>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "8px" }} align="left">
                                             {obj.ModelNumber}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "8px" }} align="left">
                                             {obj.Category}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "8px" }} align="left">
                                             {obj.SubCategory}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "8px" }} align="left">
                                             {obj.Type}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "8px" }} align="left">
                                             {obj.SellingPrice}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "8px" }} align="left">
                                             {obj.Description}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "8px" }} align="left">
                                             {obj.Stock}
                                        </TableCell>

                                        <TableCell align="center">
                                             {" "}
                                             <DeleteIcon
                                                  onClick={() => {
                                                       DeleteProduct(obj);
                                                  }}
                                                  cursor="pointer"
                                                  color="error"
                                             />
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               </TableContainer>
          </>
     );
}

export default ProductManagement;
