import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Container, Toolbar, Typography, IconButton, Badge, Box, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//icons
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { TurboMenu, NetworkMenu, getUser, setCart, setLoginForm, LoginAndSignUp } from "../";
import UserButton from "./components/UserButton";

const NavBar = () => {
     const Token = localStorage.getItem("token");
     const dispatch = useDispatch();
     const navigate = useNavigate();
     // login state management
     const user = localStorage.getItem("user");

     useEffect(() => {
          if (user) {
               axios.post(getUser, { user: user }, { headers: { "Content-Type": "application/json" } })
                    .then((response) => {
                         dispatch(setCart({ cart: response.data.userData.cartProducts }));
                    })
                    .catch((error) => {
                         console.log(error);
                    });
          }
     }, [user, dispatch]);
     // avatar functions
     const cart = useSelector((state) => state.cart.value);
     return (
          <>
               <Box sx={{ flexGrow: 1 }} position="fixed" width="100%" zIndex="999">
                    <Box sx={{ backgroundColor: "primary.dark" }}>
                         <Container maxWidth="xl" sx={{ display: "flex", height: "33px", alignItems: "center" }}>
                              <Box sx={{ flexGrow: 1 }} />

                              <Box
                                   sx={{
                                        flexGrow: 1,
                                        display: { xs: "none", sm: "flex", md: "flex" },
                                        justifyContent: { md: "flex-start", sm: "space-around" },
                                   }}
                              >
                                   <Typography component="span" color="text.secondary" variant="h6">
                                        <Typography component="span" color="text.disabled" sx={{ mr: 1 }} variant="h6">
                                             Mon -Thu:
                                        </Typography>
                                        9:00 AM - 5:30 PM
                                   </Typography>
                              </Box>

                              <Box
                                   sx={{
                                        flexGrow: 1,
                                        display: { sm: "none", xs: "none", md: "flex" },
                                        justifyContent: "space-around",
                                   }}
                              >
                                   <Typography component="span" color="text.disabled">
                                        Visit our showroom in Amala Building, Palarivattom, Kochi
                                        {/* <Link
                                             onClick={() => {
                                                  navigate("/contactUs");
                                             }}
                                             color="primary"
                                             sx={{ cursor: "pointer", ml: 1 }}
                                        >
                                             Contact Us
                                        </Link> */}
                                   </Typography>
                              </Box>

                              <Box
                                   sx={{
                                        flexGrow: 1,
                                        display: "flex",
                                        justifyContent: { md: "flex-end", xs: "center" },
                                        alignItems: "center",
                                   }}
                              >
                                   <Typography component="span" color="primary" sx={{ mr: 1 }}>
                                        Call Us: +91-7012463321
                                   </Typography>
                                   <IconButton
                                        onClick={() => {
                                             window.open("https://www.facebook.com/zetetikoz");
                                        }}
                                        size="large"
                                        edge="start"
                                        color="primary"
                                   >
                                        <FacebookIcon />
                                   </IconButton>
                                   <IconButton
                                        onClick={() => {
                                             window.open("https://www.instagram.com/zetetikoz/");
                                        }}
                                        size="large"
                                        edge="start"
                                        color="primary"
                                   >
                                        <InstagramIcon />
                                   </IconButton>
                              </Box>

                              <Box sx={{ flexGrow: 1 }} />
                         </Container>
                    </Box>

                    {/* AppBar Starts Here */}

                    <AppBar position="static" color="primary">
                         <Container maxWidth="xl">
                              <Toolbar>
                                   <Box sx={{ display: { md: "none" } }}>
                         
                                        {/* <IconButton
                                             size="large"
                                             aria-label="account of current user"
                                             aria-controls="menu-appbar"
                                             aria-haspopup="true"
                                        >
                                             <MenuIcon sx={{ fontSize: 31, color: "text.hint", pr: 1 }} />
                                        </IconButton> */}
                                   </Box>
                                   <Box
                                        onClick={() => {
                                             navigate("/");
                                        }}
                                        sx={{
                                             mr: 2,
                                             display: { xs: "none", md: "flex" },
                                             alignItems: "center",
                                             cursor: "pointer",
                                        }}
                                   >
                                        <DashboardCustomizeIcon sx={{ fontSize: 31, color: "text.hint", pr: 1 }} />
                                        <Typography variant="h2" fontWeight="700" noWrap color="text.hint" component="div">
                                             ZETETIKOZ
                                        </Typography>
                                   </Box>

                                   <Box sx={{ flexGrow: 2, display: { xs: "none" } }} />

                                   <Box sx={{ mr: 2, display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                                        {" "}
                                        <TurboMenu />
                                        <NetworkMenu />
                                        <Button
                                             sx={{ color: "text.primary" }}
                                             onClick={() => {
                                                  navigate("/aboutUs");
                                             }}
                                        >
                                             {" "}
                                             About Us
                                        </Button>
                                   </Box>

                                   <Box sx={{ flexGrow: 2 }} />

                                   <Box
                                        sx={{
                                             flexGrow: 1,
                                             display: "flex",
                                             alignItems: "center",
                                             justifyContent: "flex-end",
                                        }}
                                   >
                                        <IconButton onClick={() => navigate("/search")}>
                                             <SearchOutlinedIcon sx={{ color: "text.primary", fontSize: "25", ml: "2" }} />
                                        </IconButton>
                                        <IconButton
                                             onClick={() => {
                                                  Token ? navigate("/cart") : dispatch(setLoginForm({ loginForm: true }));
                                             }}
                                        >
                                             {cart.length > 0 ? (
                                                  <Badge badgeContent={"*"} color={"secondary"}>
                                                       <ShoppingCartOutlinedIcon sx={{ color: "text.primary", ml: "2" }} />
                                                  </Badge>
                                             ) : (
                                                  <ShoppingCartOutlinedIcon sx={{ color: "text.primary", ml: "2" }} />
                                             )}
                                        </IconButton>
                                        <Box>
                                             <IconButton
                                                  onClick={() => {
                                                       Token
                                                            ? navigate("/wishlist")
                                                            : dispatch(setLoginForm({ loginForm: true }));
                                                  }}
                                                  color="error"
                                             >
                                                  {" "}
                                                  <FavoriteIcon sx={{ fontSize: "20px" }} />
                                             </IconButton>
                                        </Box>

                                        {Token ? <UserButton /> : <LoginAndSignUp />}
                                   </Box>
                              </Toolbar>
                         </Container>
                    </AppBar>
               </Box>
          </>
     );
};

export default NavBar;
