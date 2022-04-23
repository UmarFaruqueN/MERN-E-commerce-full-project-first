import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

import { useNavigate } from "react-router-dom";

const TurboMenu = () => {
     const navigate = useNavigate();

     const [anchorEl, setAnchorEl] = useState(null);
     const open = Boolean(anchorEl);

     const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
     };
     const handleClose = () => {
          setAnchorEl(null);
     };
     return (
          <>
               <Button
                    sx={{ color: "text.primary" }}
                    id="hd-button"
                    aria-controls={open ? "hd-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
               >
                    Turbo HD Devices
               </Button>
               <Menu
                    id="hd-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                         "aria-labelledby": "basic-button",
                    }}
               >
                    <MenuItem
                         onClick={() => {
                              setAnchorEl(null);
                              navigate("/turboHDDevices");
                         }}
                    >
                         Turbo HD Camera
                    </MenuItem>
                    <MenuItem
                         onClick={() => {
                              setAnchorEl(null);
                              navigate("/turboHDDevices");
                         }}
                    >
                         DVR
                    </MenuItem>
               </Menu>
          </>
     );
};

export default TurboMenu;
