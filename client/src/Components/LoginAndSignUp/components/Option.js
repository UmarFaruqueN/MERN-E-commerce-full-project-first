import React from "react";
import { Button, Grid, Typography } from "@mui/material";

const Option = (props) => {
     return (
          <>
               <Grid item sx={{ pb: 6, pt: 6 }}>
                    <Grid item sx={{ display: "flex", justifyContent: "space-around", pt: 2, pr: 3, pl: 2 }}>
                         {" "}
                         <Button
                              sx={{ marginLeft: "10px", color: "#ffff", fontSize: "16px" }}
                              fullWidth
                              size="medium"
                              variant="contained"
                              color="warning"
                              onClick={props.Login}
                         >
                              {" "}
                              Login With Password
                         </Button>
                    </Grid>
                    <Grid item sx={{ display: "flex", justifyContent: "space-around", pt: 2 }}>
                         {" "}
                         <Typography variant="h4" color="text.disabled">
                              OR
                         </Typography>
                    </Grid>
                    <Grid item sx={{ display: "flex", justifyContent: "space-around", pt: 2, pr: 3, pl: 2 }}>
                         <Button
                              sx={{ marginLeft: "10px", color: "#ffff", fontSize: "16px" }}
                              fullWidth
                              size="medium"
                              variant="contained"
                              color="secondary"
                              onClick={props.OTP}
                         >
                              {" "}
                              Request OTP
                         </Button>
                    </Grid>
               </Grid>
          </>
     );
};

export default Option;
