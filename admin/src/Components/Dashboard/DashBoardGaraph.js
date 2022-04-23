import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
     AreaChart,
     Area,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     ResponsiveContainer,
     BarChart,
     Bar,
     Legend,
} from "recharts";

import axios from "axios";
import { getSales } from "../../utlis/Constants";
import { Typography, Grid } from "@mui/material";

function DashBoardGaraph() {
     const [allData, setAllData] = useState(null);
     const [orderd, setOrderd] = useState(null);
     const [shipped, setShipped] = useState(null);
     const [deliverd, setDeliverd] = useState(null);
     const [cancelled, setCancelled] = useState(null);
     useEffect(() => {
          axios.get(getSales)
               .then((response) => {
                    setOrderd(response.data.Orders);
                    setShipped(response.data.Shipped);
                    setDeliverd(response.data.Sales);
                    setCancelled(response.data.Cancelled);
                    setAllData(response.data.Data);
               })
               .catch((err) => {});
     }, []);
     return (
          <>
               <Grid container spacing={3} sx={{ display: "flex" }}>
                    <Grid item xs={12}>
                         <Box sx={{ height: "300px", backgroundColor: "white", p: 3 }}>
                              <ResponsiveContainer width="100%" height="100%">
                                   <BarChart
                                        width={500}
                                        height={300}
                                        data={allData}
                                        margin={{
                                             top: 20,
                                             right: 30,
                                             left: 20,
                                             bottom: 5,
                                        }}
                                   >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" stackId="a" fill="#1e9600" />
                                   </BarChart>
                              </ResponsiveContainer>
                              <Typography variant="h4"> Orders By User</Typography>
                         </Box>
                    </Grid>
                    <Grid item xs={12}>
                         <Box sx={{ height: "300px", backgroundColor: "white", p: 3 }}>
                              <ResponsiveContainer width="100%" height="100%">
                                   <AreaChart
                                        width={500}
                                        height={400}
                                        data={orderd}
                                        margin={{
                                             top: 10,
                                             right: 30,
                                             left: 0,
                                             bottom: 0,
                                        }}
                                   >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="total" stroke="#F5F7FF" fill="#8884d8" />
                                   </AreaChart>
                              </ResponsiveContainer>
                              <Typography variant="h4"> Orders By User</Typography>
                         </Box>
                    </Grid>{" "}
                    <Grid item xs={12}>
                         <Box sx={{ height: "300px", backgroundColor: "white", p: 3 }}>
                              <ResponsiveContainer width="100%" height="100%">
                                   <AreaChart
                                        width={500}
                                        height={400}
                                        data={shipped}
                                        margin={{
                                             top: 10,
                                             right: 30,
                                             left: 0,
                                             bottom: 0,
                                        }}
                                   >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#2196f3" />
                                   </AreaChart>
                              </ResponsiveContainer>
                              <Typography variant="h4"> Shipped Items</Typography>
                         </Box>
                    </Grid>{" "}
                    <Grid item xs={12}>
                         <Box sx={{ height: "300px", backgroundColor: "white", p: 3 }}>
                              <ResponsiveContainer width="100%" height="100%">
                                   <AreaChart
                                        width={500}
                                        height={400}
                                        data={deliverd}
                                        margin={{
                                             top: 10,
                                             right: 30,
                                             left: 0,
                                             bottom: 0,
                                        }}
                                   >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area
                                             type="monotone"
                                             dataKey="total"
                                             stroke="#8884d8"
                                             fill="rgba(76,228,83,0.89)"
                                        />
                                   </AreaChart>
                              </ResponsiveContainer>
                              <Typography variant="h4"> Deliverd items</Typography>
                         </Box>
                    </Grid>{" "}
                    <Grid item xs={12}>
                         <Box sx={{ height: "300px", backgroundColor: "white", p: 3 }}>
                              <ResponsiveContainer width="100%" height="100%">
                                   <AreaChart
                                        width={500}
                                        height={400}
                                        data={cancelled}
                                        margin={{
                                             top: 10,
                                             right: 30,
                                             left: 0,
                                             bottom: 0,
                                        }}
                                   >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#ff0000" />
                                   </AreaChart>
                              </ResponsiveContainer>
                              <Typography variant="h4">Cancelled Items</Typography>
                         </Box>
                    </Grid>
               </Grid>
          </>
     );
}

export default DashBoardGaraph;
