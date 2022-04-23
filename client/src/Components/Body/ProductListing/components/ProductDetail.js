import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductDetail = (props) => {
     const navigate = useNavigate();
     return (
          <>
               <Grid pt={2} pl={2} item>
                    <IconButton
                         onClick={() => {
                              navigate("/product/" + props.details._id);
                         }}
                    >
                         {" "}
                         <Typography variant="h4">{props.details.ModelNumber}</Typography>
                    </IconButton>
               </Grid>
               <Grid item pt={4} pl={2}>
                    {" "}
                    <IconButton
                         onClick={() => {
                              navigate("/product/" + props.details._id);
                         }}
                    >
                         <Typography fontWeight={400} variant="h4">
                              {props.details.Description}
                         </Typography>
                    </IconButton>
               </Grid>
               <Grid item sx={{ display: "flex", flexDirection: "row", pl: 2, pt: 2, pb: 1 }}>
                    {" "}
                    <Grid item>
                         <Typography color="error">
                              {props.details.Offer===0?<br/>:
                              <del> Price ₹{props.details.SellingPrice}</del>}
                         </Typography>
                    </Grid>{" "}
                    <Grid pl={2}>
                         {" "}
                         <Typography variant="h3">Price ₹ {props.details.SellingPrice-props.details.Offer} /-</Typography>
                    </Grid>
               </Grid>
          </>
     );
};

export default ProductDetail;
