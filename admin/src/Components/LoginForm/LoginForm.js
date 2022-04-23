import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "axios";
import { loginPost } from "../../utlis/Constants";

const Copyright = (props) => {
     return (
          <Typography variant="body2" color="text.primary" align="center" {...props}>
               {"Copyright © "}
               <Link color="inherit" href="https://zetetikoz.com/">
                    ZetetikoZ
               </Link>{" "}
               {new Date().getFullYear()}
               {"."}
          </Typography>
     );
};

const LoginForm = () => {
     const navigate = useNavigate();
     const {
          register,
          formState: { errors },
          handleSubmit,
     } = useForm();

     const submit = handleSubmit((data) => {
          axios.post(loginPost, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log(response);
                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         title: response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    });

                    localStorage.setItem("token", response.data.token);
                    navigate("/dashboard");
                    setTimeout(() => {
                         window.location.reload();
                    }, 1500);
               })
               .catch((err) => {
                    console.log(err);
                    alert(err.response.data.message);
               });
     });

     return (
          <Container
               component="main"
               color="primary"
               maxWidth="xs"
               sx={{ bgcolor: "secondary.light", borderRadius: "20px", pb: 1 }}
          >
               <CssBaseline />
               <Box
                    sx={{
                         marginTop: 8,
                         display: "flex",
                         flexDirection: "column",
                         alignItems: "center",
                    }}
               >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                         <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h2">
                         Admin Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                         <TextField
                              color="secondary"
                              margin="normal"
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              autoFocus
                              {...register("email", {
                                   required: "Email id Required",
                                   pattern: {
                                        value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]$/,
                                        message: "Enter a valid email adress",
                                   },
                              })}
                         />
                         <span>{errors.email?.message}</span>

                         <TextField
                              color="secondary"
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                              {...register("password", { required: "Password Required" })}
                         />

                         <span>{errors.password?.message}</span>
                         <Button onClick={submit} fullWidth variant="contained" color="secondary" sx={{ mt: 3, mb: 2 }}>
                              Sign In
                         </Button>
                    </Box>
               </Box>
               <Copyright sx={{ mt: 5, mb: 2 }} />
          </Container>
     );
};

export default LoginForm;
