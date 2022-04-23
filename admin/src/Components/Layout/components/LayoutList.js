import React from "react";

import { List, ListItem, ListItemIcon, Divider, ListItemText } from "@mui/material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import { useNavigate } from "react-router-dom";

const LayoutList = () => {
     const navigate = useNavigate();
     return (
          <>
               <List>
                    <ListItem
                         button
                         onClick={() => {
                              navigate("/dashboard");
                         }}
                    >
                         <ListItemIcon>
                              <DashboardIcon color="secondary" />
                         </ListItemIcon>
                         <ListItemText>Dashboard</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem
                         button
                         onClick={() => {
                              navigate("/userManagement");
                         }}
                    >
                         <ListItemIcon>
                              <PersonIcon color="secondary" />
                         </ListItemIcon>
                         <ListItemText>User Management</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem
                         button
                         onClick={() => {
                              navigate("/categoryManagement");
                         }}
                    >
                         <ListItemIcon>
                              <CategoryIcon color="secondary" />
                         </ListItemIcon>
                         <ListItemText>Category Management</ListItemText>
                    </ListItem>
                    <Divider />

                    <ListItem
                         button
                         onClick={() => {
                              navigate("/productManagement");
                         }}
                    >
                         <ListItemIcon>
                              <ProductionQuantityLimitsIcon color="secondary" />
                         </ListItemIcon>
                         <ListItemText>Product Management</ListItemText>
                    </ListItem>
                    <Divider />

                    <ListItem
                         button
                         onClick={() => {
                              navigate("/offerManagement");
                         }}
                    >
                         <ListItemIcon>
                              <LocalOfferIcon color="secondary" />
                         </ListItemIcon>
                         <ListItemText>Offer Management</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem
                         button
                         onClick={() => {
                              navigate("/bannerManagement");
                         }}
                    >
                         <ListItemIcon>
                              <ViewCarouselIcon color="secondary" />
                         </ListItemIcon>
                         <ListItemText>Banner Management</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem
                         button
                         onClick={() => {
                              navigate("/orderManagement");
                         }}
                    >
                         <ListItemIcon>
                              <InventoryIcon color="secondary" />
                         </ListItemIcon>
                         <ListItemText>Order Management</ListItemText>
                    </ListItem>
                    <Divider />
               </List>
          </>
     );
};

export default LayoutList;
