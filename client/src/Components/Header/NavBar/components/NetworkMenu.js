import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

import { useNavigate } from "react-router-dom";

const NetworkMenu = () => {
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
                    id="network-button"
                    aria-controls={open ? "network-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
               >
                    Network Devices
               </Button>
               <Menu
                    id="network-menu"
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
                              navigate("/internetProtocolDevices");
                         }}
                    >
                         IP Camera
                    </MenuItem>
                    <MenuItem
                         onClick={() => {
                              setAnchorEl(null);
                              navigate("/internetProtocolDevices");
                         }}
                    >
                         NVR
                    </MenuItem>
               </Menu>{" "}
          </>
     );
};

export default NetworkMenu;
