import React from "react";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

const LeftSide = (props) => {
     return (
          <>
               <Grid item>
                    {" "}
                    <Typography color="#F5F7FF" fontWeight="700" variant="h2">
                       {props.signup?"SIGN UP":"LOGIN"}  
                    </Typography>{" "}
               </Grid>
               <Grid item>
                    {" "}
                    <Typography color="#F5F7FF" variant="h3">
                         Get access to your Orders, Wishlist and Recommendations
                    </Typography>
               </Grid>
               <Grid item>
                    {" "}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                         <DashboardCustomizeIcon sx={{ fontSize: 31, color: "#F5F7FF", pr: 1 }} />
                         <Typography variant="h2" fontWeight="700" noWrap color="#F5F7FF" component="div">
                              ZETETIKOZ
                         </Typography>
                    </Box>
               </Grid>
          </>
     );
};

export default LeftSide;
