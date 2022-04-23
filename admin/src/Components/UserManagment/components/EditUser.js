import React, { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";

import { updateUser,setUserData } from "../";


const EditUser = (props) => {
     const [open, setOpen] = useState(false);
     const dispatch = useDispatch();
     //form validation

     const formSchema = Yup.object().shape({
          name: Yup.string().required("Name Required"),
          email: Yup.string().required("email required").email("Enter a valid email"),
          phone: Yup.string().required("Number Required").min(10, "Minimum 10 numbers").max(10, "Maximum 10 numbers"),
     });

     const {
          register,
          formState: { errors },
          handleSubmit,
     } = useForm({
          mode: "onTouched",
          resolver: yupResolver(formSchema),
          defaultValues: {
               name: props.data.name,
               email: props.data.email,
               phone: props.data.phone,
               active: props.data.active,
          },
     });

     const Submit = handleSubmit((data) => {
          console.log(data);
          const _id =props.data._id
          data={...data,_id}
          console.log(data);
          axios.post(updateUser, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log(response);

                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         text: response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         height: "5rem",
                         width: "15rem",
                    });

                    dispatch(setUserData({ userData: response.data.userData }));
                    setOpen(false);
               })
               .catch((err) => {
                    console.log(err.response.data.message);
                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         text: err.response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         height: "5rem",
                         width: "15rem",
                    });
               });
     });
     //form validation ends here

     const handleClickOpen = () => {
          setOpen(true);
     };

     return (
          <div>
               <EditIcon cursor="pointer" onClick={handleClickOpen} color="secondary" />
               <Dialog open={open} onClose={Submit}>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogContent color="secondary">
                         <DialogContentText color="secondary">Name</DialogContentText>

                         <div className="form-group mb-3">
                              <TextField
                                   color="secondary"
                                   size="small"
                                   variant="outlined"
                                   className="form-control"
                                   {...register("name")}
                              />

                              <DialogContentText color="error">{errors.name?.message}</DialogContentText>
                         </div>

                         <DialogContentText color="secondary">Email</DialogContentText>

                         <div className="form-group mb-3">
                              <TextField
                                   color="secondary"
                                   size="small"
                                   variant="outlined"
                                   className="form-control"
                                   {...register("email", {
                                        required: "Email id Required",
                                        pattern: {
                                             value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]$/,
                                             message: "Enter a valid email adress",
                                        },
                                   })}
                              />
                              <DialogContentText color="error">{errors.email?.message}</DialogContentText>
                         </div>

                         <DialogContentText color="secondary">Phone</DialogContentText>
                         <div className="form-group mb-3">
                              <TextField
                                   size="small"
                                   variant="outlined"
                                   className="form-control"
                                   color="secondary"
                                   {...register("phone")}
                              />
                              <DialogContentText color="error">{errors.phone?.message}</DialogContentText>
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

export default EditUser;
