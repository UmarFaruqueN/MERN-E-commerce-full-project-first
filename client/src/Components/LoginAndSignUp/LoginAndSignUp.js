import { Button, Dialog, Grid, Typography, IconButton, Link } from "@mui/material";
import React, { useState } from "react";
import LeftSide from "./components/LeftSide";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setLoginForm } from "../../Redux/loginForm/loginForm";
import Option from "./components/Option";
import LoginForm from "./components/LoginForm";
import OtpForm from "./components/OtpForm";
import SignUpForm from "./components/SignUpForm";
import { useNavigate } from "react-router-dom";

const LoginAndSignUp = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const open = useSelector((state) => state.loginForm.value);

     const [option, setOption] = useState(true);
     const [login, setLogin] = useState(false);
     const [otp, setOtp] = useState(false);
     const [signup, setSignup] = useState(false);
     const CloseForm = () => {
          setOption(true);
          setSignup(false);
          setOtp(false);
          setLogin(false);
          dispatch(setLoginForm({ loginForm: false }));
     };

     const Login = () => {
          setOption(false);
          setSignup(false);
          setOtp(false);
          setLogin(true);
     };

     const OTP = () => {
          setOption(false);
          setLogin(false);
          setSignup(false);
          setOtp(true);
     };

     const SignUp = () => {
          setOption(false);
          setLogin(false);
          setOtp(false);
          setSignup(true);
     };

     const SignUpCancel = () => {
          setLogin(false);
          setOtp(false);
          setSignup(false);
          setOption(true);
     };

     const handleClickOpen = () => {
          setLogin(false);
          setOtp(false);
          setSignup(false);
          setOption(true);
          dispatch(setLoginForm({ loginForm: true }));
     };

     return (
          <>
               <Button onClick={handleClickOpen} color="secondary">
                    {" "}
                    Login{" "}
               </Button>
               <Dialog maxWidth="md" open={open} onClose={CloseForm}>
                    <Grid container height="450px" width="700px">
                         <Grid
                              item
                              md={5}
                              sx={{
                                   backgroundColor: "#0156ff",
                                   display: "flex",
                                   flexDirection: "column",
                                   justifyContent: "space-evenly",
                                   p: 3,
                              }}
                         >
                              <LeftSide signup={signup} />
                         </Grid>
                         <Grid
                              sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                              item
                              md={7}
                              pb={4}
                         >
                              <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>
                                   {" "}
                                   <IconButton onClick={CloseForm} color="error">
                                        {" "}
                                        <CloseIcon />
                                   </IconButton>
                              </Grid>
                              {option ? <Option Login={Login} OTP={OTP} /> : ""}
                              {login ? <LoginForm SignUpCancel={SignUpCancel} /> : ""}
                              {otp ? <OtpForm SignUpCancel={SignUpCancel} /> : ""}

                              {signup ? (
                                   <SignUpForm SignUpCancel={SignUpCancel} />
                              ) : (
                                   <Grid item sx={{ display: "flex", justifyContent: "space-around" }}>
                                        {" "}
                                        <IconButton onClick={SignUp}>
                                             <Typography sx={{ cursor: "pointer", color: "#0156ff" }}>
                                                  {" "}
                                                  New to Zetetikoz? Create an account
                                             </Typography>
                                        </IconButton>
                                   </Grid>
                              )}

                              <Grid item sx={{ display: "flex", justifyContent: "space-around", pt: 1, pb: 2 }}>
                                   {" "}
                                   <Typography fontSize="10px">
                                        By continuing, you agree to Zetetikoz's{" "}
                                        <Link
                                             onClick={() => {
                                                  navigate("/terms");
                                             }}
                                             sx={{ color: "#0156ff", cursor: "pointer" }}
                                        >
                                             Terms of Use
                                        </Link>{" "}
                                        and{" "}
                                        <Link
                                             onClick={() => {
                                                  navigate("/privacyPolicy");
                                             }}
                                             sx={{ color: "#0156ff", cursor: "pointer" }}
                                        >
                                             Privacy Policy
                                        </Link>
                                        .
                                   </Typography>
                              </Grid>
                         </Grid>
                    </Grid>
               </Dialog>
          </>
     );
};

export default LoginAndSignUp;
