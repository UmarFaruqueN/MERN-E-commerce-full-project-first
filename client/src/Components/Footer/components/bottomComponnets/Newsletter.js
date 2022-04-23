import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import BlueButton from "../../../Common/BlueButton"

const Newsletter = () => {
     const {
          register,
          formState: { errors },
          //handleSubmit,
     } = useForm();
     return (
          <Grid pt={3} container>
               <Grid item xs={6}>
                    <Typography variant="h2" color="primary">
                         <u> Sign Up To Our Newsletter. </u>
                    </Typography>
                    <Typography pt={1} variant="h4" fontWeight="300" color="primary">
                         {" "}
                         Be the first to hear about the latest offers.
                    </Typography>
               </Grid>
               <Grid item sx={{ display: "flex", alignItems: "center" }} xs={6}>
                    <Grid item xs={6}>
                         <TextField
                         sx={{backgroundColor:"#acacac"}}
                              size="small"
                              placeholder="Email"
                              variant="outlined"
                              border="secondary"
                              type="email"
                              name="email"
                              fullWidth
                              {...register("email", {
                                   required: "Email id Required",
                                   pattern: {
                                        value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]$/,
                                        message: "Enter a valid email adress",
                                   },
                              })}
                         />
                         <Typography pl={4} color="error">
                              {errors?.email?.message}
                         </Typography>
                    </Grid>
                    <Grid pl={2} item xs={3}>
               <BlueButton title={"Subscribe"}/>
                    </Grid>
               </Grid>
          </Grid>
     );
};

export default Newsletter;
