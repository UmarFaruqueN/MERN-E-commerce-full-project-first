import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tooltip, IconButton, Avatar, Divider, Menu, MenuItem } from "@mui/material";

import { change_login_state } from "../../";

const UserButton = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const [anchorElUser, setAnchorElUser] = useState(null);

     const handleCloseUserMenu = () => {
          setAnchorElUser(null);
     };
     const handleOpenUserMenu = (event) => {
          setAnchorElUser(event.currentTarget);
     };

     const handleClickLogout = () => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch(change_login_state({ login_state: false }));
          setAnchorElUser(null);
          navigate("/");
     };
     return (
          <>
               <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ ml: "2" }}>
                         <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                    </IconButton>
               </Tooltip>
               <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                         vertical: "top",
                         horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                         vertical: "top",
                         horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
               >
                    <MenuItem
                         onClick={() => {
                              navigate("profile");
                              setAnchorElUser(null);
                         }}
                    >
                         Profile
                    </MenuItem>
                    <MenuItem
                         onClick={() => {
                              navigate("myOrders");
                              setAnchorElUser(null);
                         }}
                    >
                         Orders
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
               </Menu>
          </>
     );
};

export default UserButton;
