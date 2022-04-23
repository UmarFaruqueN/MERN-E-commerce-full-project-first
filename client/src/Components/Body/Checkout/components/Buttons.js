import React from "react";
import { Button, Grid } from "@mui/material";

const Buttons = (props) => {
     

     const Delivery = () => {
          props.confirmAddress();
          };

     const ChangeAddress = () => {
          props.changeAddress();

     };
     return (
          <Grid item sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
               {props.disabled ? (
                    <Grid item>
                         {" "}
                         <Button onClick={ChangeAddress} color="warning" variant="contained">
                              Change Address
                         </Button>
                    </Grid>
               ) : (
                    <Grid item>
                         {" "}
                         <Button onClick={Delivery} color="secondary" variant="contained">
                              {" "}
                              Deliver Here
                         </Button>
                    </Grid>
               )}
          </Grid>
     );
};

export default Buttons;
