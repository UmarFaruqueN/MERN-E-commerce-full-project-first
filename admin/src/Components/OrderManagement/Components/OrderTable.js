import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography } from "@mui/material";
import StatusUpdation from "./StatusUpdation";

const OrderTable = (props) => {
     return (
          <>
               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                         <TableHead>
                              <TableRow>
                                   <TableCell align="left"> Order id</TableCell>
                                   <TableCell align="left">Customer</TableCell>
                                   <TableCell align="left">Amount</TableCell>
                                   <TableCell align="left">Payment</TableCell>
                                   <TableCell align="left">Ordered On</TableCell>
                                   <TableCell align="center">Status</TableCell>
                                   <TableCell align="left">Updated On</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {props.data.length > 0 ? (
                                   <>
                                        {props.data?.map((obj) => (
                                             <TableRow key={obj._id}>
                                                  <TableCell sx={{ cursor: "pointer" }} align="left">
                                                       {obj._id.slice(18, 24)}
                                                  </TableCell>
                                                  <TableCell align="left">{obj.name}</TableCell>
                                                  <TableCell align="left">{obj.total}</TableCell>
                                                  <TableCell align="left">{obj.paymentType}</TableCell>
                                                  <TableCell align="left">{obj.orderTime}</TableCell>
                                                  <TableCell align="center">
                                                       <StatusUpdation data={obj} />
                                                  </TableCell>
                                                  <TableCell align="left">{obj.statusTime}</TableCell>
                                             </TableRow>
                                        ))}
                                   </>
                              ) : (
                                   ""
                              )}
                         </TableBody>
                    </Table>
               </TableContainer>
               {props.data.length > 0 ? (
                    ""
               ) : (
                    <Grid container>
                         <Grid
                              item
                              md={12}
                              sx={{
                                   backgroundColor: "#fff",
                                   display: "flex",
                                   flexDirection: "column",
                                   alignItems: "center",
                                   mt: 2,
                                   p: 2,
                              }}
                         >
                              <Typography variant="h2"> No Orders In This Criteria</Typography>
                         </Grid>
                    </Grid>
               )}
          </>
     );
};

export default OrderTable;
