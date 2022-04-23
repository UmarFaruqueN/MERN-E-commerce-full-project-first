import React, { useEffect } from "react";
import { Grid, Typography,Divider, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import DeleteIcon from "@mui/icons-material/Delete";
import EditAddress from "./EditAdress";
import { deleteAddress, getAddress } from "../../../../../utlis/Constants";
import { setAddress } from "../../../../../Redux";

const AddressManagement = () => {
     const dispatch = useDispatch();
     const user = localStorage.getItem("user");
     const addressData = useSelector((state) => state.address.value);


     useEffect(() => {
          axios.post(getAddress, { user: user }, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setAddress({ address: response.data.allAddress }));
               })
               .catch((err) => {
                    console.log(err);
                    console.log(err?.response?.data?.message);
               });
     }, [dispatch,user]);
    
    
     const Delete = (data) => {
          Swal.fire({    
               title: "Are You Sure?",
               text: "Do You Want To  Remove This Address !",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, Remove!",
          }).then((result) => {
               if (result.isConfirmed) {
                    console.log(data);
                    axios.post(deleteAddress, data, { headers: { "Content-Type": "application/json" } })
                         .then((response) => {
                              dispatch(setAddress({ address: response.data.allAddress }));
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "success",
                                   title: response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   width: "15rem",
                              });
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
               {addressData?.map((obj) => (
                    <>
                         <Grid
                              sx={{
                                   display: "flex",
                                   flexDirection: "row",
                                   justifyContent: "space-between",
                                   alignItems: "center",
                              }}
                              width="100%"
                              height="80px"
                              key={obj._id}
                         >
                              <Grid item>
                                   <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                                        <Grid item>
                                             <Typography pl={1} fontWeight="400" variant="h4">
                                                  {" "}
                                                  {obj.address},
                                             </Typography>{" "}
                                        </Grid>
                                        <Grid item>
                                             <Typography pl={1} fontWeight="400" variant="h4">
                                                  {" "}
                                                  {obj.street},
                                             </Typography>{" "}
                                        </Grid>
                                   </Grid>
                                   <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                                        <Grid item>
                                             <Typography pl={1} fontWeight="400" variant="h4">
                                                  {" "}
                                                  {obj.city},
                                             </Typography>{" "}
                                        </Grid>

                                        <Grid item>
                                             <Typography pl={1} fontWeight="400" variant="h4">
                                                  {" "}
                                                  {obj.pin},
                                             </Typography>{" "}
                                        </Grid>
                                   </Grid>
                                   <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                                        <Grid item>
                                             <Typography pl={1} fontWeight="400" variant="h4">
                                                  {" "}
                                                  {obj.district},
                                             </Typography>{" "}
                                        </Grid>

                                        <Grid item>
                                             <Typography pl={1} fontWeight="400" variant="h4">
                                                  {" "}
                                                  {obj.state}.
                                             </Typography>{" "}
                                        </Grid>
                                   </Grid>
                              </Grid>

                              <Grid item>
                                   <Grid item>
                                        {" "}
                                        <EditAddress data={obj} />{" "}
                                   </Grid>
                                   <Grid item>
                                        <IconButton onClick={() => Delete(obj)}>
                                             {" "}
                                             <DeleteIcon color="error" />
                                        </IconButton>
                                   </Grid>
                              </Grid>
                         </Grid>
                         <Divider key={obj._id + 2} />
                    </>
               ))}
          </>
     );
};

export default AddressManagement;
