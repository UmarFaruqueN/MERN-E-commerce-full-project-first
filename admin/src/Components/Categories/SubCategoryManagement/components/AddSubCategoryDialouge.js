import React, { useState, useEffect } from "react";
import {
     TextField,
     Dialog,
     DialogActions,
     DialogContent,
     DialogTitle,
     DialogContentText,
     Button,
     Select,
     MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import { addSubCategory, getCategory, setSubCategory, setCategory } from "../../";

const AddSubCategoryDialouge = () => {
     const category = useSelector((state) => state.category.value);
     const [open, setOpen] = useState(false);
     const dispatch = useDispatch();
     //form validation

     const formSchema = Yup.object().shape({
          category: Yup.string().required("Category required"),
          subCategory: Yup.string().required("Sub Category required"),
     });

     const {
          register,
          formState: { errors },
          handleSubmit,
     } = useForm({
          mode: "onTouched",
          resolver: yupResolver(formSchema),
     });

     //form validation ends here

     const Submit = handleSubmit((data) => {
          console.log(data);
          axios.post(addSubCategory, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         text: response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         height: "5rem",
                         width: "15rem",
                    });
                    console.log(response);
                    dispatch(setSubCategory({ subCategory: response.data.allSubCategory }));
                    setOpen(false);
               })
               .catch((err) => {
                    Swal.fire({
                         position: "bottom-end",
                         icon: "error",
                         text: err.response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         height: "5rem",
                         width: "15rem",
                    });
                    console.log(err.response.data.message);
               });
     });

     const handleClickOpen = () => {
          setOpen(true);
     };

     useEffect(() => {
          axios.get(getCategory, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    // alert(response.data.message)
                    dispatch(setCategory({ category: response.data?.allCategory }));
                    console.log(category);
               })
               .catch((err) => {
                    console.log(err.response.data.message);
                    alert(err.response.data.message);
               });
     }, [dispatch,category]);

     return (
          <div>
               <Button color="secondary" variant="contained" onClick={handleClickOpen}>
                    Add Sub Category
               </Button>
               <Dialog open={open} onClose={Submit}>
                    <DialogTitle>Add Sub Category</DialogTitle>
                    <DialogContent color="secondary">
                         <DialogContentText color="secondary">Category</DialogContentText>

                         <div>
                              <Select
                                   label="Category"
                                   color="secondary"
                                   margin="normal"
                                   fullWidth
                                   id="category"
                                   name="category"
                                   {...register("category", {
                                        required: "Category Required",
                                   })}
                              >
                                   {category.map((obj) => (
                                        <MenuItem value={obj.category}>{obj.category}</MenuItem>
                                   ))}
                              </Select>
                              <DialogContentText color="error">{errors.category?.message}</DialogContentText>
                         </div>
                    </DialogContent>
                    <DialogContent color="secondary">
                         <DialogContentText color="secondary">Category</DialogContentText>

                         <div>
                              <TextField
                                   label="Sub Category"
                                   color="secondary"
                                   margin="normal"
                                   fullWidth
                                   id="subCategory"
                                   name="subCategory"
                                   {...register("subCategory", {
                                        required: "Sub Category Required",
                                   })}
                              />

                              <DialogContentText color="error">{errors.subCategory?.message}</DialogContentText>
                         </div>
                    </DialogContent>
                    <DialogActions>
                         <Button
                              color="secondary"
                              cursor="pointer"
                              onClick={() => {
                                   setOpen(false);
                              }}
                         >
                              Cancel
                         </Button>
                         <Button color="secondary" cursor="pointer" onClick={Submit}>
                              Submit
                         </Button>
                    </DialogActions>
               </Dialog>
          </div>
     );
};

export default AddSubCategoryDialouge;
