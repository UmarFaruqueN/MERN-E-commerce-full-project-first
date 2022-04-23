import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

const ProductAddAppBar = (props) => {
     return (
          <>
               <AppBar sx={{ position: "static" }}>
                    <Toolbar>
                         <IconButton edge="start" color="inherit" onClick={props.Close} aria-label="close">
                              <CloseIcon />
                         </IconButton>
                         <Box sx={{ flexGrow: "2" }} />

                         <Box sx={{ mr: 2, display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                              <DashboardCustomizeIcon sx={{ fontSize: 31, color: "text.hint", pr: 1 }} />
                              <Typography variant="h2" fontWeight="700" noWrap color="text.hint" component="div">
                                   ZETETIKOZ
                              </Typography>
                              <Typography sx={{ ml: 2, flex: 1 }} variant="h3" color="secondary" component="div">
                                   {props.title}
                              </Typography>
                         </Box>
                         <Box sx={{ flexGrow: "2" }} />
                    </Toolbar>
               </AppBar>
          </>
     );
};

export default ProductAddAppBar;
