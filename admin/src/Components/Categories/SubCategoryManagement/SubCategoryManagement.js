import React, { useEffect } from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

import { getSubCategory, deleteSubCategory, setSubCategory, EditSubCategoryDialouge, AddSubCategoryDialouge } from "../";

const SubCategoryManagement = () => {
     const dispatch = useDispatch();
     const subCategory = useSelector((state) => state.subCategory.value);

     useEffect(() => {
          axios.get(getSubCategory, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    // alert(response.data.message)
                    dispatch(setSubCategory({ subCategory: response.data?.subCategoryData }));
                    console.log(subCategory);
               })
               .catch((err) => {
                    console.log(err.response.data.message);
                    alert(err.response.data.message);
               });
     }, [dispatch, subCategory]);

     const DeleteCategory = (catData) => {
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
                    axios.post(deleteSubCategory, catData, { headers: { "Content-Type": "application/json" } })
                         .then((response) => {
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "success",
                                   title: response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   width: "15rem",
                              });

                              dispatch(setSubCategory({ subCategory: response.data?.subCategoryData }));
                              console.log(subCategory);
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
               <Box
                    component="form"
                    sx={{
                         "& > :not(style)": { m: 1, width: "25ch" },
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "space-around",
                    }}
                    noValidate
                    autoComplete="off"
               >
                    <AddSubCategoryDialouge />
               </Box>

               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                         <TableHead>
                              <TableRow>
                                   <TableCell>Category Name</TableCell>
                                   <TableCell>SubCategory Name</TableCell>

                                   <TableCell align="right">Update</TableCell>
                                   <TableCell align="right">Delete</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {subCategory?.map((obj) => (
                                   <TableRow key={obj._id}>
                                        <TableCell component="th" scope="row">
                                             {obj.category}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                             {obj.subCategory}
                                        </TableCell>
                                        <TableCell align="right">
                                             <EditSubCategoryDialouge data={obj} />
                                        </TableCell>
                                        <TableCell align="right">
                                             <DeleteIcon
                                                  onClick={() => {
                                                       DeleteCategory(obj);
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
};

export default SubCategoryManagement;
