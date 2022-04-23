import { Divider, Grid, Typography } from "@mui/material";
import React from "react";

const Title = (props) => {
     return (
          <>
               <Grid container pt={2} pb={1}>
                    <Grid item md={12}>
                         <Typography variant="h2"> {props.title}</Typography>
                    </Grid>
               </Grid>
               <Divider />
          </>
     );
};

export default Title;
