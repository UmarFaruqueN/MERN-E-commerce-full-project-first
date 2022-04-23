import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid, TextField, DialogTitle, DialogContentText, Button, Container } from "@mui/material";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import axios from "axios";
import { loginPost, verifyPost } from "../../../utlis/Constants";
import { change_login_state } from "../../../Redux/login/login";
import { setUserData } from "../../../Redux/userData/userData";
import { setLoginForm } from "../../../Redux/loginForm/loginForm";

const OtpForm = (props) => {
     const dispatch = useDispatch();
     const navigate = useNavigate();

     //form validation
     const [showOtp, setShowOtp] = useState(false);
     const [showSignup, setShowSignup] = useState(false);
     const [sendOtp, setSendOtp] = useState(true);
     const {
          register,
          formState: { errors },
          handleSubmit,
     } = useForm();

     const SendOTP = handleSubmit((data) => {
          console.log(data);
          axios.post(loginPost, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log("response");
                    console.log(response);
                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         title: response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    });
                    setSendOtp(false);
                    setShowSignup(false);
                    setShowOtp(true);
               })
               .catch((err) => {
                    console.log("eroor");
                    console.log(err.response.data.message);

                    if (!err.response.data.userStatus) {
                         setShowSignup(false);
                    } else {
                         setSendOtp(false);
                         setShowSignup(true);
                    }
               });
     });

     const VerifyOTP = handleSubmit((data) => {
          console.log(data);
          axios.post(verifyPost, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log("response verified");
                    console.log(response);
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
                    localStorage.setItem("user", response.data.userId);
                    dispatch(setLoginForm({ loginForm: false }));
                    navigate("/");
               })
               .catch((err) => {
                    console.log("eroor");
                    console.log(err.response.data.message);
               });
     });

     //form validation ends here

     let closeImg = { cursor: "pointer", float: "right", marginTop: "5px", width: "20px" };

     return (
          <>
               <Container>
                    <DialogTitle>
                         Enter Mobile Number For Login{" "}
                         <img
                              onClick={props.SignUpCancel}
                              src="https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png"
                              style={closeImg}
                              alt="imaage"
                         />
                    </DialogTitle>
                    <Grid>
                         <DialogContentText color="secondary">Number</DialogContentText>

                         <TextField
                              fullWidth
                              color="secondary"
                              size="small"
                              variant="outlined"
                              className="form-control"
                              type="number"
                              {...register("phone", {
                                   required: " Mobile Number Required",
                                   maxLength: {
                                        value: 10,
                                        message: "Only 10 Numbers allowed",
                                   },
                                   minLength: {
                                        value: 10,
                                        message: " Numbers Required",
                                   },
                              })}
                         />
                         <DialogContentText color="error">{errors.phone?.message}</DialogContentText>
                    </Grid>
                    {showSignup ? (
                         <DialogContentText color="error">
                              Number Is Not Registered With Account, Check The Number Or Create Account{" "}
                         </DialogContentText>
                    ) : (
                         ""
                    )}

                    {showOtp ? <DialogContentText color="secondary">Enter OTP</DialogContentText> : ""}

                    {showOtp ? (
                         <TextField
                              color="secondary"
                              size="small"
                              variant="outlined"
                              className="form-control"
                              type="number"
                              {...register("otp", {
                                   required: " OTP Required",
                                   maxLength: {
                                        value: 4,
                                        message: "Only 4Numbers allowed",
                                   },
                                   minLength: {
                                        value: 4,
                                        message: "4  Required",
                                   },
                              })}
                         />
                    ) : (
                         ""
                    )}

                    {showSignup ? (
                         <Grid sx={{ display: "fllex", justifyContent: "space-around" }}>
                              <Button color="secondary" onClick={SendOTP}>
                                   Resend OTP
                              </Button>
                         </Grid>
                    ) : (
                         ""
                    )}

                    {showOtp ? (
                         <Button color="secondary" onClick={VerifyOTP}>
                              Confirm
                         </Button>
                    ) : (
                         ""
                    )}
                    {sendOtp ? (
                         <Grid sx={{ display: "flex", justifyContent: "space-around" }}>
                              <Button color="secondary" onClick={SendOTP}>
                                   Send OTP
                              </Button>
                         </Grid>
                    ) : (
                         ""
                    )}
               </Container>
          </>
     );
};

export default OtpForm;
