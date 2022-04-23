import React from "react";
import { Link, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Address = () => {
     const navigate = useNavigate();
     return (
          <Grid pb={7} container>
               <Grid item xs={7}>
                    <Grid item pt={4}>
                         <Typography variant="h4" color="text.disabled">
                              Information
                         </Typography>
                    </Grid>{" "}
                    <Grid item pt={2} sx={{ display: "flex", flexDirection: "column" }}>
                         {/* <Link
                         onClick={() => navigate('/aboutUs')}
                              pb={0.5}
                              variant="h5"
                              
                              underline="hover"
                              sx={{ cursor: "pointer" }}
                         >
                              {" "}
                              About Us
                         </Link> */}
                         {/* <Link 
                         onClick={() => navigate('/privacyPolicy')} pb={0.5} variant="h5" href="#" underline="hover" sx={{ cursor: "pointer" }}>
                              {" "}
                              Privacy Policy
                         </Link> */}
                         <Link onClick={() => navigate('/search')}
                          pb={0.5} variant="h5" href="#" underline="hover" sx={{ cursor: "pointer" }}>
                              {" "}
                              Search
                         </Link>
                         {/* <Link
                         onClick={() => navigate('/terms')} pb={0.5} variant="h5" href="#" underline="hover" sx={{ cursor: "pointer" }}>
                              {" "}
                              Terms
                         </Link> */}
                         <Link
                         onClick={() => navigate('/myOrders')} pb={0.5} variant="h5" href="#" underline="hover" sx={{ cursor: "pointer" }}>
                              {" "}
                            Orders
                         </Link>
                         {/* <Link
                         onClick={() => navigate('/contactUs')} pb={0.5} variant="h5" href="#" underline="hover" sx={{ cursor: "pointer" }}>
                              {" "}
                              Contact Us
                         </Link> */}
                         <Link
                         onClick={() => navigate('/internetProtocolDevices')} pb={0.5} variant="h5" href="#" underline="hover" sx={{ cursor: "pointer" }}>
                              {" "}
                              Internet Protocol Devices
                         </Link>
                         <Link
                         onClick={() => navigate('/turboHDDevices')} variant="h5" href="#" underline="hover" sx={{ cursor: "pointer" }}>
                              Turbo HD Devices
                         </Link>
                    </Grid>
               </Grid>
               <Grid item xs={5}>
                    <Grid item pt={4} pb={2}>
                         <Typography variant="h4" color="text.disabled">
                              Address & Contact
                         </Typography>
                    </Grid>{" "}
                    <Grid item>
                         <Typography pb={0.5} color="primary">
                              Address: Amala Building, Palarivattom, Kochi
                         </Typography>
                         <Typography pb={0.5} color="primary">
                              Phones: 77 3635 2673
                         </Typography>
                         <Typography pb={0.5} color="primary">
                              We are open: Monday-Thursday: 9:00 AM - 5:30 PM
                         </Typography>
                         <Typography pb={0.5} color="primary">
                              Friday: 9:00 AM - 6:00 PM
                         </Typography>
                         <Typography pb={0.5} color="primary">
                              Saturday: 11:00 AM - 5:00 PM
                         </Typography>
                         <Typography pb={0.5} color="primary">
                              E-mail:{" "}
                              <Link color="secondary" href="mailto:info.zetetikoz@gmail.com">
                                   info@zetetikoz.com
                              </Link>
                         </Typography>
                    </Grid>
               </Grid>
          </Grid>
     );
};

export default Address;
