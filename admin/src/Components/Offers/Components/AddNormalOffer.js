import { Grid, Select, Typography, MenuItem, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addOffer } from "../../../utlis/Constants";
import { setOffers } from "../../../Redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const AddNormalOffer = (props) => {
     const [err, setErr] = useState(null);
     const [err1, setErr1] = useState(null);
     const dispatch = useDispatch();
     const {
          register,
          formState: { errors },
          handleSubmit,
     } = useForm({
          mode: "onTouched",
          reValidateMode: "onChange",
          defaultValues: {
               title: props.title,
          },
     });

     const Submit = handleSubmit((data) => {
          setErr(null);
          setErr1(null);
          console.log(data);
          axios.post(addOffer, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setOffers({ offers: response.data.allOffer }));
                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         text: response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    });
                    props.Cancel();
               })
               .catch((err) => {
                    console.log(err);
                    console.log("ENTHO ERRORE UND");
                    if (err?.response?.data?.maxPrice) {
                         setErr1(err?.response?.data?.message + err?.response?.data?.maxPrice);
                    } else {
                         setErr(err?.response?.data?.message);
                    }
                    console.log(err?.response?.data?.message);
               });
     });

     return (
          <>
               <Grid conatiner>
                    <Grid item pb={2}>
                         <Grid item pb={2}>
                              <Typography variant="h4"> Select {props.title}</Typography>
                         </Grid>
                         <Grid item>
                              {" "}
                              <Select
                                   color="secondary"
                                   variant="outlined"
                                   margin="normal"
                                   size="small"
                                   fullWidth
                                   id="type"
                                   name="type"
                                   {...register("type", {
                                        required: "type Required",
                                   })}
                              >
                                   {props.Cat?.map((obj) => (
                                        <MenuItem value={obj.category}>{obj.category}</MenuItem>
                                   ))}
                                   {props.SubCat?.map((obj) => (
                                        <MenuItem value={obj.subCategory}>{obj.subCategory}</MenuItem>
                                   ))}
                              </Select>
                              <Typography color="error" variant="h5">
                                   {" "}
                                   {errors.type?.message}
                              </Typography>
                         </Grid>
                    </Grid>
                    <Grid item pb={2}>
                         <Grid item>
                              <Typography variant="h4"> Amount</Typography>
                         </Grid>
                         <Grid item>
                              <TextField
                                   size="small"
                                   color="secondary"
                                   margin="normal"
                                   fullWidth
                                   type="number"
                                   id="offerAmount"
                                   name="offerAmount"
                                   {...register("offerAmount", {
                                        required: "Offer Amount  Required",
                                   })}
                              />
                              <Typography color="error" variant="h5">
                                   {" "}
                                   {err1}
                                   {errors.offerAmount?.message}
                              </Typography>
                         </Grid>
                    </Grid>
                    <Grid item>
                         <Grid item pb={2}>
                              <Typography variant="h4"> Minimum Purchase</Typography>
                         </Grid>
                         <Grid item>
                              <TextField
                                   size="small"
                                   color="secondary"
                                   margin="normal"
                                   fullWidth
                                   type="number"
                                   id="minimumPurchase"
                                   name="minimumPurchase"
                                   {...register("minimumPurchase", {
                                        required: "Minimum Purchase  Required",
                                   })}
                              />
                              <Typography color="error" variant="h5">
                                   {" "}
                                   {errors.minimumPurchase?.message}
                                   {err}
                              </Typography>
                         </Grid>
                    </Grid>
                    <Grid item pb={2} pt={2} sx={{ display: "flex" }}>
                         <Grid item pr={2}>
                              <Button size="small" onClick={props.Cancel} color="error" variant="contained">
                                   Cancel
                              </Button>
                         </Grid>
                         <Grid item>
                              <Button size="small" onClick={Submit} color="secondary" variant="contained">
                                   Add Offers
                              </Button>
                         </Grid>
                    </Grid>
               </Grid>
          </>
     );
};

export default AddNormalOffer;
