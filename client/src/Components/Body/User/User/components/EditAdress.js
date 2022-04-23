import React, { useState } from "react";
import TitleBar from "../../../Checkout/components/TitleBar";
import { TextField, Typography, Button, Grid, Dialog, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {  useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";

import { updateAddress } from "../../../../../utlis/Constants";
import { setAddress } from "../../../../../Redux";

function EditAddress(props) {
     const [open, setOpen] = useState(false);
     const dispatch = useDispatch();
     const [er, setEr] = useState(null);

     //form validation

     const formSchema = Yup.object().shape({
          address: Yup.string().required("Address Required"),
          street: Yup.string().required("Street Required"),
          city: Yup.string().required("City Required"),
          pin: Yup.string().required("PIN Required").min(6, "Minimum 6 numbers").max(6, "Maximum 6 numbers"),
          district: Yup.string().required("District Required"),
          state: Yup.string().required("State Required"),
     });

     const {
          register,
          formState: { errors },
          handleSubmit,
     } = useForm({
          mode: "onTouched",
          resolver: yupResolver(formSchema),
          defaultValues: {
               _id: props.data?._id,
               user: props.data?.user,
               name: props.data?.name,
               phone: props.data?.phone,
               address: props.data?.address,
               street: props.data?.street,
               city: props.data?.city,
               pin: props.data?.pin,
               district: props.data?.district,
               state: props.data?.state,
          },
     });

     const Submit = handleSubmit((data) => {
          console.log(data);
          axios.post(updateAddress, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log(response);
                    setEr(null);
                    dispatch(setAddress({ address: response.data.allAddress }));
                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         title: response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    });
                    props.addedAddress();
               })
               .catch((err) => {
                    console.log(err.response.data.message);
                    setEr(err.response.data.message);
               });
     });
     //form validation ends here

     const handleClose = () => {
          setOpen(false);
     };
     const handleOpen = () => {
          setOpen(true);
     };
     return (
          <>
               <IconButton onClick={handleOpen}>
                    <EditIcon color="success" />
               </IconButton>
               <Dialog open={open} onClose={handleClose}>
                    <TitleBar title={"ADD ADDRESS"} />
                    <Grid container sx={{ display: "flex", flexDirection: "column", pl: 20, pr: 20, pt: 2 }}>
                         <Typography variant="h4" color="error">
                              {er}
                         </Typography>
                         <Typography color="secondary">Address</Typography>
                         <TextField
                              color="secondary"
                              size="small"
                              variant="outlined"
                              className="form-control"
                              {...register("address")}
                         />

                         <Typography color="error">{errors.address?.message}</Typography>

                         <Typography color="secondary">Street</Typography>

                         <TextField
                              color="secondary"
                              size="small"
                              variant="outlined"
                              className="form-control"
                              {...register("street")}
                         />

                         <Typography color="error">{errors.street?.message}</Typography>

                         <Typography color="secondary">City</Typography>

                         <TextField
                              color="secondary"
                              size="small"
                              variant="outlined"
                              className="form-control"
                              {...register("city")}
                         />

                         <Typography color="error">{errors.city?.message}</Typography>

                         <Typography color="secondary">PIN</Typography>

                         <TextField
                              size="small"
                              variant="outlined"
                              className="form-control"
                              color="secondary"
                              {...register("pin")}
                         />
                         <Typography color="error">{errors.pin?.message}</Typography>

                         <Typography color="secondary">District</Typography>

                         <TextField
                              color="secondary"
                              size="small"
                              variant="outlined"
                              className="form-control"
                              {...register("district")}
                         />

                         <Typography color="error">{errors.district?.message}</Typography>

                         <Typography color="secondary">State</Typography>

                         <TextField
                              color="secondary"
                              size="small"
                              variant="outlined"
                              className="form-control"
                              {...register("state")}
                         />

                         <Typography color="error">{errors.state?.message}</Typography>

                         <Grid
                              item
                              sx={{ display: "flex", justifyContent: "space-around", pt: 2 }}
                         >
                              <Button sx={{ mr: 2 }} onClick={handleClose} variant="contained" color="error">
                                   Cancel
                              </Button>
                              <Button color="secondary" variant="contained" onClick={Submit}>
                                   Submit
                              </Button>
                         </Grid>
                    </Grid>
                    <Grid sx={{ pb: 2 }}></Grid>
               </Dialog>
          </>
     );
}

export default EditAddress;
