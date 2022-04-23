import React, { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

import { addCategory, setCategory } from "../../";

const AddCategoryDialouge = () => {
     const [open, setOpen] = useState(false);
     const dispatch = useDispatch();
     //form validation

     const formSchema = Yup.object().shape({
          category: Yup.string().required("Category required"),
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
          axios.post(addCategory, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setCategory({ category: response.data.allCategory }));
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

     return (
          <div>
               <Button color="secondary" variant="contained" onClick={handleClickOpen}>
                    Add Category
               </Button>
               <Dialog open={open} onClose={Submit}>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogContent color="secondary">
                         <DialogContentText color="secondary">Category</DialogContentText>

                         <div className="form-group mb-3">
                              <TextField
                                   label="Category"
                                   color="secondary"
                                   margin="normal"
                                   X
                                   fullWidth
                                   id="category"
                                   name="category"
                                   {...register("category", {
                                        required: "Category Required",
                                   })}
                              />

                              <DialogContentText color="error">{errors.category?.message}</DialogContentText>
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

export default AddCategoryDialouge;
