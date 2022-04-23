import React, { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

import { updateSubCategory, setSubCategory } from "../../";

const EditSubCategoryDialouge = (props) => {
     const [open, setOpen] = useState(false);
     const dispatch = useDispatch();
     //form validation

     const formSchema = Yup.object().shape({
          category: Yup.string().required("Category required"),
          subCategory: Yup.string().required("Category required"),
     });

     const {
          register,
          formState: { errors },
          handleSubmit,
     } = useForm({
          mode: "onTouched",
          resolver: yupResolver(formSchema),
          defaultValues: {
               subCategory: props.data.subCategory,
               category: props.data.category,
               _id: props.data._id,
          },
     });

     //form validation ends here

     const Submit = handleSubmit((data) => {
          console.log(data);
          axios.post(updateSubCategory, data, { headers: { "Content-Type": "application/json" } })
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

                    dispatch(setSubCategory({ subCategory: response.data.subCategoryData }));
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
               <EditIcon cursor="pointer" onClick={handleClickOpen} color="secondary" />
               <Dialog open={open} onClose={Submit}>
                    <DialogTitle>Edit Sub Category</DialogTitle>
                    <DialogContent color="secondary">
                         <DialogContentText color="secondary">Category</DialogContentText>

                         <div className="form-group mb-3">
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

export default EditSubCategoryDialouge;
