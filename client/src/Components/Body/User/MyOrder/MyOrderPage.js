import {
     Button,
     Container,
     Divider,
     Grid,
     Paper,
     Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import LeftBox from "../Components/LeftBox";
import Title from "../Components/Title";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setOrder } from "../../../../Redux";
import { getOrder, cancelOrder } from "../../../../utlis/Constants";

const MyOrderPage = () => {
     const [rend, setRend] = useState(25);
     const dispatch = useDispatch();
     const user = localStorage.getItem("user");;
     const orders = useSelector((state) => state.order.value);

     useEffect(() => {
          axios.post(getOrder, { user: user }, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log(response.data.orderData);

                    dispatch(setOrder({ order: response.data.orderData }));
               })
               .catch((err) => {
                    console.log(err);
                    console.log(err.response.data.message);
               });
     }, [rend,dispatch,user]);

     const Cancel = (data) => {
          setRend(5);
          Swal.fire({
               title: "Are You Sure?",
               text: "Do You Want To  Cancel This Order!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, Cancel!",
          }).then((result) => {
               if (result.isConfirmed) {
                    const orderDate = new Date().toLocaleString();
                    const obj = { ...data, orderDate };
                    console.log(data);
                    axios.post(cancelOrder, obj, { headers: { "Content-Type": "application/json" } })
                         .then((response) => {
                              setRend(1);
                              dispatch(setOrder({ order: response.data.orderData }));
                              console.log(response.data.orderData);
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "success",
                                   title: response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   width: "15rem",
                              });
                              setRend(1);
                         })
                         .catch((err) => {
                              console.log(err);
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "error",
                                   title: err.response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   width: "15rem",
                              });
                         });
               }
          });
     };

     return (
          <>
               <Box pt={13}>
                    <Container>
                         <Title />

                         <Grid container spacing={4} pt={5}>
                              <LeftBox order={true} />
                              <Grid item md={8}>
                                   <Grid item pb={3}>
                                        {" "}
                                        <Grid item pb={1}>
                                             {" "}
                                             <Typography variant="h2">My Orders</Typography>
                                        </Grid>
                                        <Divider />
                                   </Grid>
                                   {orders.length > 0 ? (
                                        ""
                                   ) : (
                                        <Grid item pb={1}>
                                             {" "}
                                             <Typography variant="h3">No orders </Typography>
                                        </Grid>
                                   )}
                                   {orders?.map((order) => (
                                        <Grid key={orders._id} container pb={3}>
                                             <Paper elevation={10} sx={{ borderRadius: 0, p: 5, width: "100%" }}>
                                                  {order?.products?.map((obj) => (
                                                       <>
                                                            <Grid key={obj?._id}>
                                                                 <Grid
                                                                      item
                                                                      sx={{
                                                                           display: "flex",
                                                                           justifyContent: "space-around",
                                                                           alignItems: "center",
                                                                      }}
                                                                 >
                                                                      <Grid item>
                                                                           <img
                                                                                width="75px"
                                                                                height="75px"
                                                                                src={obj?.Image1}
                                                                                alt="productImage"
                                                                           />
                                                                      </Grid>
                                                                      <Grid item>
                                                                           <Typography variant="h5">
                                                                                {obj?.ModelNumber}
                                                                           </Typography>
                                                                      </Grid>
                                                                      <Grid item>
                                                                           <Typography variant="h5">
                                                                                Nos-{obj?.count}
                                                                           </Typography>
                                                                      </Grid>
                                                                      <Grid item>
                                                                           {" "}
                                                                           <Typography variant="h5">
                                                                                ₹ {obj?.count * obj?.SellingPrice}
                                                                           </Typography>
                                                                      </Grid>
                                                                      <Grid item>
                                                                           <Typography variant="h5">
                                                                                {" "}
                                                                                {/* {order.deliveryStatus}{" "} */}
                                                                                {order?.orderStatus} ON <br />
                                                                                {order?.statusTime}
                                                                           </Typography>
                                                                      </Grid>
                                                                 </Grid>
                                                            </Grid>
                                                            <Divider />
                                                       </>
                                                  ))}

                                                  <Grid
                                                       item
                                                       sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}
                                                  >
                                                       <Grid item pl={4}>
                                                            {" "}
                                                            <Typography variant="h3"> Total : ₹ {order?.total}</Typography>
                                                       </Grid>{" "}
                                                       <Grid item>
                                                            {" "}
                                                            {order.orderStatus==="User Ordered"?
                                                            <Button
                                                                 size="small"
                                                                 sx={{ borderRadius: "1px" }}
                                                                 variant="contained"
                                                                 color="error"
                                                                 onClick={() => Cancel(order)}
                                                            >
                                                                 Cancel
                                                            </Button>:""}
                                                       </Grid>
                                                  </Grid>
                                             </Paper>
                                        </Grid>
                                   ))}
                              </Grid>
                         </Grid>
                    </Container>
               </Box>
          </>
     );
};

export default MyOrderPage;
