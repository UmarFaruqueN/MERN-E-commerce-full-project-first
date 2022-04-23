import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import LogOutButton from "../Buttons/logOutButton";
import LayoutList from "./components/LayoutList";

const drawerWidth = 240;
const Layout = ({ children }) => {
     return (
          <Box sx={{ display: "flex" }}>
               <CssBaseline />
               <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                    <Toolbar>
                         <Typography variant="h2" noWrap component="div" sx={{ flexGrow: 1 }}>
                              Admin Pannel
                         </Typography>
                         <LogOutButton />
                    </Toolbar>
               </AppBar>
               <Drawer
                    sx={{
                         width: drawerWidth,
                         flexShrink: 0,
                         "& .MuiDrawer-paper": {
                              width: drawerWidth,
                              boxSizing: "border-box",
                         },
                    }}
                    variant="permanent"
                    anchor="left"
               >
                    <Toolbar />

                    <Divider />
                    <LayoutList />
               </Drawer>
               <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                    <Toolbar />
                    {children}
               </Box>
          </Box>
     );
};

export default Layout;
