import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ButtonConfig from "./ButtonConfig";
import ProductIncrement from "./ProductIncrement";
import ProductPrice from "./ProductPrice";

const ProductDetail = (props) => {
     const [count, setCount] = useState(1);
     return (
          <>
               <Grid item md={6}>
                    <Box
                         sx={{
                              height: "500px",
                              display: "flex",
                              alignItems: "center",
                         }}
                    >
                         <Box
                              sx={{
                                   height: "300px",
                                   display: "flex",
                                   flexDirection: "column",
                                   alignItems: "center",
                                   justifyContent: "space-evenly",
                              }}
                         >
                              <Grid ml={10} container>
                                   <Grid item xs={12}>
                                        <Grid pb={2} item>
                                             <Typography variant="h2"> {props.data?.ProductName}</Typography>
                                        </Grid>
                                        <Grid pb={1} item>
                                             <Typography variant="h3"> {props.data?.ModelNumber}</Typography>
                                        </Grid>
                                        <Grid pb={1} item>
                                             <Typography noWrap={false} variant="body">
                                                  {props.data?.Description}
                                             </Typography>
                                        </Grid>
                                        <Grid>
                                             <Typography color="error" variant="h4">
                                                  {props.data?.Offer === 0 ? (
                                                       <br />
                                                  ) : (
                                                       <del color="error"> Price ₹ {props.data?.SellingPrice} </del>
                                                  )}
                                             </Typography>
                                        </Grid>
                                   </Grid>
                              </Grid>

                              <Grid pl={5} spacing={4} container sx={{ alignItems: "center" }}>
                                   <Grid item md={5}>
                                        <ProductPrice price={(props.data?.SellingPrice - props.data?.Offer) * count} />
                                   </Grid>
                                   <Grid item md={7}>
                                        <ProductIncrement data={props.data} count={count} setCount={setCount} />
                                   </Grid>
                              </Grid>

                              <ButtonConfig data={props.data} count={count} />
                         </Box>
                    </Box>
               </Grid>
          </>
     );
};

export default ProductDetail;
