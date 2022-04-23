import React from "react";
import { Button } from "@mui/material";

const OrangeButton = (props) => {
     return (
          <>
               <Button sx={{ marginLeft: "10px" }} variant="contained" color="warning">
                    {props.title}
               </Button>
          </>
     );
};

export default OrangeButton;
