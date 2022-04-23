import {
     Button,
     TextField,
     Grid,
     Typography,
     InputAdornment,
     IconButton,
     OutlinedInput,
     FormControl,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { editPassword } from "../../../../../utlis/Constants";
import { setUserData } from "../../../../../Redux";

const EditPassword = (props) => {
     const user = localStorage.getItem("user");
     const dispatch = useDispatch();
     const [data1, setData1] = useState(null);
     const [su, setSu] = useState(null);
     const [er, setEr] = useState(null);
     const [change, setChange] = useState(false);

     const Submit1 = () => {
          const allData = {
               update: data1,
               user: user,
               checkPass: true,
          };
          console.log(allData);
          axios.post(editPassword, allData, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    setSu(null);
                    setEr(null);
                    setChange(true);
                    props.setUp(550);
               })
               .catch((err) => {
                    setSu(null);
                    setEr(err?.response?.data?.message);
                    props.setUp(5503);
               });
     };

     const [showPassword, setShowPassword] = useState(false);

     const formSchema = Yup.object().shape({
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
          const allData = {
               update: data,
               user: user,
               checkPass: false,
          };
          axios.post(editPassword, allData, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setUserData({ userData: response.data.userData }));
                    console.log(response);
                    setEr(null);
                    setSu(response.data.message);
                    setTimeout(() => {
                         setSu(null);
                         props.Cancel();
                    }, 1500);
                    setEr(null);
                    props.setUp(50);
               })
               .catch((err) => {
                    setSu(null);
                    console.log(err.response.data.message);
                    setEr(err?.response?.data?.message);
                    props.setUp(55);
               });
     });

     return (
          <>
               {change ? (
                    <Grid container sx={{ display: "flex", flexDirection: "column", pl: 5, pr: 5 }}>
                         <Typography variant="h4" color="error">
                              {er}
                         </Typography>
                         <Typography color="rgba(76,228,83,0.89)" variant="h4">
                              {su}
                         </Typography>
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
                         <Typography color="error">{errors.cpassword?.message}</Typography>

                         <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                              <Button onClick={() => props.Cancel()} color="error">
                                   Cancel
                              </Button>
                              <Button color="success" onClick={Submit}>
                                   Submit
                              </Button>
                         </Grid>
                    </Grid>
               ) : (
                    <Grid item sx={{ display: "flex" }}>
                         {" "}
                         <Grid item>
                              {er ? (
                                   <Typography variant="h4" color="error">
                                        {er}
                                   </Typography>
                              ) : (
                                   ""
                              )}
                              {su ? (
                                   <Typography variant="h4" color="rgba(76,228,83,0.89)">
                                        {su}
                                   </Typography>
                              ) : (
                                   ""
                              )}

                              <TextField
                                   onChange={(e) => {
                                        setData1(e.target.value);
                                   }}
                                   type="password"
                                   placeholder="Enter Old Password"
                                   size="small"
                              />
                         </Grid>
                         <Grid item>
                              <Button onClick={Submit1} size="small" color="secondary">
                                   Submit
                              </Button>
                         </Grid>
                         <Grid item>
                              <Button onClick={() => props.Cancel()} size="small" color="error">
                                   Cancel
                              </Button>
                         </Grid>
                    </Grid>
               )}
          </>
     );
};

export default EditPassword;
