import React from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import footerIcon from "../../../../asset/footerIcon.svg";

const BottomBar = () => {
     return (
          <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} container>
               <Grid item>
                    <IconButton
                         size="large"
                         edge="start"
                         sx={{ color: "#acacac" }}
                         onClick={() => {
                              window.open("https://www.facebook.com/zetetikoz");
                         }}
                    >
                         <FacebookIcon />
                    </IconButton>
                    <IconButton
                         size="large"
                         edge="start"
                         sx={{ color: "#acacac" }}
                         onClick={() => {
                              window.open("https://www.instagram.com/zetetikoz/");
                         }}
                    >
                         <InstagramIcon />
                    </IconButton>
               </Grid>

               <Grid item>
                    <img src={footerIcon} alt="footer icons" />
                    
               </Grid>
               <Grid item>
                    <Typography variant="h6" color="text.disabled">
                         {" "}
                         <u>Copyright © 2022 ZetetikoZ.</u>
                    </Typography>
               </Grid>
          </Grid>
     );
};

export default BottomBar;
