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
import { useDispatch} from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import { userLoginPost } from "../../../utlis/Constants";
import { setCart, setLoginForm, setUserData, change_login_state } from "../../../Redux";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const [er, setEr] = useState(null);
     const [su, setSu] = useState(null);
     //form validation

     const [showPassword, setShowPassword] = useState(false);

     const formSchema = Yup.object().shape({
          email: Yup.string().required("Email Required").email("Enter a valid email"),
          password: Yup.string()
               .required("Password  Required")
               .min(4, "Password length should be at least 4 characters")
               .max(12, "Password cannot exceed more than 12 characters"),
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
          setEr(null);
          console.log(data);
          axios.post(userLoginPost, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log(response);
                    setSu(response.data.message);
                         props.SignUpCancel()
                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         title: response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    });
                    dispatch(setUserData({ userData: response.data.user }));
                    dispatch(change_login_state({ login_state: true }));
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", response.data.userId )
                    dispatch(setLoginForm({ loginForm: false }));
                    dispatch(setCart({ cart: response.data.user.cartProducts }));

                    navigate("/");
               })
               .catch((err) => {
                    console.log(err.response.data.message);
                    setEr(err.response.data.message);
               });
     });
     //form validation ends here

     return (
          <>
               <Grid container sx={{ display: "flex", flexDirection: "column", pl: 5, pr: 5 }}>
                    <Typography variant="h4" color="error">
                         {er}
                    </Typography>
                    <Typography variant="h3" color="success">
                         {su}
                    </Typography>

                    <Typography color="secondary">Email</Typography>

                    <TextField
                    sx={{borderRadius:0}}
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

                    <Typography color="secondary">Password</Typography>

                    <FormControl variant="outlined" size="small" className="form-control">
                         <OutlinedInput
                              color="secondary"
                              type={showPassword ? "text" : "password"}
                              {...register("password")}
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
                    <Typography color="error">{errors.password?.message}</Typography>

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

export default LoginForm;
