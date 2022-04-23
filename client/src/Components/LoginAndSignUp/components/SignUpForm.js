import React, { useState } from "react";
import {
     TextField,
     InputAdornment,
     Typography,
     IconButton,
     OutlinedInput,
     FormControl,
     Button,
     Grid,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";


import { signupPost } from "../../../utlis/Constants";


const SignUpForm = (props) => {
     const [er, setEr] = useState(null);
     const [su, setSu] = useState(null);
     //form validation

     const [showPassword, setShowPassword] = useState(false);

     const formSchema = Yup.object().shape({
          name: Yup.string().required("Name Required"),
          email: Yup.string().required("Email Required").email("Enter a valid email"),
          phone: Yup.string().required("Number Required").min(10, "Minimum 10 numbers").max(10, "Maximum 10 numbers"),
          password: Yup.string()
               .required("Password  Required")
               .min(4, "Password length should be at least 4 characters")
               .max(12, "Password cannot exceed more than 12 characters"),
          cpassword: Yup.string()
               .required("Confirm Password Required")
               .min(4, "Password length should be at least 4 characters")
               .max(12, "Password cannot exceed more than 12 characters")
               .oneOf([Yup.ref("password")], "Passwords do not match"),
     });

     const {
          register,
          formState: { errors },
          handleSubmit,
     } = useForm({
          mode: "onTouched",
          resolver: yupResolver(formSchema),
          defaultValues: {
               active: true,
          },
     });

     const Submit = handleSubmit((data) => {
          console.log(data);
          axios.post(signupPost, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log(response);
                    setEr(null)
                    setSu(response.data.message)
                    setTimeout(() => {
                      props.SignUpCancel()
                    }, 1500);
                    
               })
               .catch((err) => {
                    console.log(err.response.data.message);
                    setEr(err.response.data.message);
               });
     });
     //form validation ends here
   ;

     return (
          <>
               <Grid container sx={{ display: "flex", flexDirection: "column", pl: 5, pr: 5 }}>
                    <Typography variant="h4" color="error">
                         {er}
                    </Typography>
                    <Typography sx={{color:'rgba(76,228,83,0.89)'}} variant="h3" >
                         {su} 
                    </Typography>
                    <Typography color="secondary">Name</Typography>

                    <TextField
                         color="secondary"
                         size="small"
                         variant="outlined"
                         className="form-control"
                         {...register("name")}
                    />

                    <Typography color="error">{errors.name?.message}</Typography>

                    <Typography color="secondary">Email</Typography>

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
                    <Typography color="error">{errors.email?.message}</Typography>

                    <Typography color="secondary">Phone</Typography>

                    <TextField
                         size="small"
                         variant="outlined"
                         className="form-control"
                         color="secondary"
                         {...register("phone")}
                    />
                    <Typography color="error">{errors.phone?.message}</Typography>

                    <Typography color="secondary">Password</Typography>

                    <FormControl variant="outlined" size="small" className="form-control">
                         <OutlinedInput
                              color="secondary"
                              type={showPassword ? "text" : "password"}
                              {...register("password")}
                              endAdornment={
                                   <InputAdornment>
                                        <IconButton
                                             edge="end"
                                             onClick={() => {
                                                  setShowPassword(!showPassword);
                                             }}
                                        >
                                             {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                   </InputAdornment>
                              }
                         />
                    </FormControl>
                    <Typography color="error">{errors.password?.message}</Typography>

                    <Typography color="secondary">Confirm Password</Typography>

                    <FormControl variant="outlined" size="small" className="form-control">
                         <OutlinedInput
                              color="secondary"
                              type={showPassword ? "text" : "password"}
                              {...register("cpassword")}
                              endAdornment={
                                   <InputAdornment position="end">
                                        <IconButton
                                             edge="end"
                                             onClick={() => {
                                                  setShowPassword(!showPassword);
                                             }}
                                        >
                                             {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                   </InputAdornment>
                              }
                         />
                    </FormControl>
                    <Typography color="error">{errors.cpassword?.message}</Typography>

                    <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                         <Button onClick={props.SignUpCancel} color="secondary">
                              Cancel
                         </Button>
                         <Button color="secondary" onClick={Submit}>
                              Submit
                         </Button>
                    </Grid>
               </Grid>
          </>
     );
};

export default SignUpForm;
