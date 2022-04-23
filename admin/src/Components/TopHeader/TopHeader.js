import React from "react";
import { Typography, Box, IconButton, Link, Container } from "@mui/material/";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";


function TopHeader() {
     return (
          <>
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
                                   <Link color="primary" sx={{ cursor: "pointer", ml: 1 }}>
                                        Contact Us
                                   </Link>
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
                              <IconButton size="large" edge="start" color="primary">
                                   <FacebookIcon />
                              </IconButton>
                              <IconButton size="large" edge="start" color="primary">
                                   <InstagramIcon />
                              </IconButton>
                         </Box>

                         <Box sx={{ flexGrow: 1 }} />
                    </Container>
               </Box>
          </>
     );
}

export default TopHeader;
