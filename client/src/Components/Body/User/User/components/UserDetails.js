import { Grid } from "@mui/material";
import React, { useState } from "react";
import AddAddress from "../../../Checkout/components/AddAddress";
import TitleBar from "../../../Checkout/components/TitleBar";
import Title from "../../Components/Title";
import AddressManagement from "./AddressManagement";
import EditUserDetail from "./EditUserDetail";

const UserDetails = (props) => {
     const [add, setAdd] = useState(false);

     const addAddress = () => {
          setAdd(true);
          props.setUp(5);
     };
     const addedAddress = () => {
          setAdd(false);
          props.setUp(10);
     };

     return (
          <Grid item md={8} sx={{ display: "flex", flexDirection: "column" }}>
               <Grid item xs={12} pb={3}>
                    <Title title="Profile." />
               </Grid>
               <Grid item sx={{ display: "flex" }}>
                    {" "}
                    <Grid item md={5}>
                         <EditUserDetail setUp={props.setUp} />
                    </Grid>
                    <Grid md={7} ml={1} item>
                         <Grid item>
                              {" "}
                              {add ? (
                                   <AddAddress setUp={props.setUp} addedAddress={addedAddress} />
                              ) : (
                                   <>
                                        <TitleBar addAddress={addAddress} title={"Address"} btn={true} />{" "}
                                        <AddressManagement />{" "}
                                   </>
                              )}
                         </Grid>
                    </Grid>
               </Grid>

               <Grid item></Grid>
          </Grid>
     );
};

export default UserDetails;
