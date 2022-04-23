import React from "react";
import { Grid, Typography, Radio, Divider } from "@mui/material";

const Address = (props) => {
     const SelectAddress = (obj) => {
          props.setAddress({
               _id: obj._id,
               user: obj.user,
               name: obj.name,
               phone: obj.phone,
               email: obj.email,
               address: obj.address,
               street: obj.street,
               city: obj.city,
               pin: obj.pin,
               district: obj.district,
               state: obj.state,
          });

          props.selectAddress();
     };

     return (
          <>
               {props.Data?.map((obj) => (
                    <>
                         <Grid
                              sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                              width="100%"
                              height="80px"
                              key={obj?._id}
                         >
                              <Grid item>
                                   {" "}
                                   {props.checked ? (
                                        <Radio color="secondary" checked={true} />
                                   ) : (
                                        <Radio
                                             onChange={() => {
                                                  SelectAddress(obj);
                                             }}
                                             sx={{ color: "#0156ff" }}
                                             color="secondary"
                                        />
                                   )}
                              </Grid>
                              <Grid item>
                                   <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                                        {" "}
                                        <Grid item>
                                             <Typography fontWeight="400" variant="h4" pl={3}>
                                                  {" "}
                                                  {obj?.name} -
                                             </Typography>{" "}
                                        </Grid>
                                        <Grid item>
                                             {" "}
                                             <Typography pl={3} fontWeight="400" variant="h4">
                                                  {" "}
                                                  {obj?.phone}
                                             </Typography>{" "}
                                        </Grid>{" "}
                                   </Grid>
                                   <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                                        <Grid item>
                                             <Typography pl={3} fontWeight="400" variant="h4">
                                                  {" "}
                                                  {obj?.address},
                                             </Typography>{" "}
                                        </Grid>
                                        <Grid item>
                                             <Typography pl={1} fontWeight="400" variant="h4">
                                                  {" "}
                                                  {obj?.street},
                                             </Typography>{" "}
                                        </Grid>

                                        <Grid item>
                                             <Typography pl={1} fontWeight="400" variant="h4">
                                                  {" "}
                                                  {obj?.city},
                                             </Typography>{" "}
                                        </Grid>

                                        <Grid item>
                                             <Typography pl={1} fontWeight="400" variant="h4">
                                                  {" "}
                                                  {obj?.pin},
                                             </Typography>{" "}
                                        </Grid>

                                        <Grid item>
                                             <Typography pl={1} fontWeight="400" variant="h4">
                                                  {" "}
                                                  {obj?.district},
                                             </Typography>{" "}
                                        </Grid>

                                        <Grid item>
                                             <Typography pl={1} fontWeight="400" variant="h4">
                                                  {" "}
                                                  {obj?.state}.
                                             </Typography>{" "}
                                        </Grid>
                                   </Grid>
                              </Grid>
                         </Grid>
                         <Divider key={obj?._id + 2} />
                    </>
               ))}
          </>
     );
};

export default Address;
