import React from "react";
import { Grid, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const Stock = (props) => {
     return (
          <>
               <Grid item md={2} backgroundColor="secondary.light">
                    {props.stock ? (
                         <Grid
                              item
                              sx={{
                                   display: "flex",
                                   flexDirection: "row",
                                   justifyContent: "flex-end",
                                   pt: 1,
                                   pr: 2,
                              }}
                         >
                              <DoneIcon color="success" />
                              <Typography color={"#4ce453"} variant="h4">
                                   InStock
                              </Typography>
                         </Grid>
                    ) : (
                         <Grid
                              item
                              sx={{
                                   display: "flex",
                                   flexDirection: "row",
                                   justifyContent: "flex-end",
                                   pt: 1,
                                   pr: 2,
                              }}
                         >
                              <CloseIcon color="error" />
                              <Typography color={"#ff0000"} variant="h4">
                                   No Stock
                              </Typography>
                         </Grid>
                    )}
               </Grid>
          </>
     );
};

export default Stock;
