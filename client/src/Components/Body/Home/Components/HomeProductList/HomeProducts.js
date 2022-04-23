import React from "react";
import { Box } from "@mui/system";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { Button, Grid, Typography } from "@mui/material";

import { useSelector } from "react-redux";

import ProductCard from "./ProductCard";

const HomeProducts = (props) => {
     const tempData = useSelector((state) => state.products.value);

     return (
          <>
               <Box
                    sx={{
                         flexGrow: 1,
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "space-between",
                         height: "60px",
                         width: "100%",
                         backgroundColor: "secondary.light",
                         marginTop: "22px",
                         borderRadius: "20px",
                    }}
               >
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                         <DashboardCustomizeIcon sx={{ fontSize: "1.9rem", color: "text.hint", pr: 1 }} />
                         <Typography variant="h2" fontWeight="700" noWrap color="text.hint" component="div">
                              {props.title}
                         </Typography>
                         <Typography marginLeft="6px" variant="h2" fontWeight="600" fontSize="1.8rem" color="#00AEB8">
                              |
                         </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 8 }} />
                    <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                         <Button onClick={props.nav} variant="contained" color="secondary">
                              Show More
                         </Button>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
               </Box>

               {/* product listing */}

               <Box sx={{ width: "100%", marginTop: "22px" }}>
                    <Grid container columnSpacing={2} wrap="nowrap" sx={{ overflow: "auto" }}>
                         <Grid item>
                              <Box sx={{ flexGrow: 1 }}>
                                   <img src={props.pic} width="192px" height="360px" alt="productImage" />{" "}
                              </Box>
                         </Grid>
                         <ProductCard data={tempData} />
                    </Grid>
               </Box>
          </>
     );
};

export default HomeProducts;
