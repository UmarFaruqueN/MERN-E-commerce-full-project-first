import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Container, Divider } from "@mui/material";

import { Newsletter, Address, BottomBar } from "../";

const useStyles = makeStyles({
     boxStyle: {
          height: "100%",
          width: "100%",
          backgroundColor: "#000000",
     },
     subBox: {
          width: "260px",
          height: "160px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-evenly",
     },
});

const FooterBottom = () => {
     const classes = useStyles();
     return (
          <Box className={classes.boxStyle}>
               <Container>
                    <Newsletter />
                    <Address />
                    <Divider color="#acacac" />
                    <BottomBar />
               </Container>
          </Box>
     );
};

export default FooterBottom;
