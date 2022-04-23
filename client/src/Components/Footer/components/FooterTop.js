import { Typography, Box, Container, Avatar } from "@mui/material/";
import React from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
     boxStyle: {
          height: "260px",
          width: "100%",
          backgroundColor: "#F5F7FF",
          marginTop: "22px",
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

const FooterTop = () => {
     const classes = useStyles();

     return (
          <>
               <Box className={classes.boxStyle}>
                    <Container
                         sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", paddingTop: "51px" }}
                    >
                         <Box className={classes.subBox}>
                              <Avatar sx={{ bgcolor: "blue", height: "4.063rem", width: "4.063rem", textAlign: "center" }}>
                                   <SupportAgentRoundedIcon sx={{ fontSize: "2.5rem" }} />
                              </Avatar>
                              <Typography variant="h3" textAlign="center">
                                   {" "}
                                   Product Support{" "}
                              </Typography>
                              <Typography variant="h5" textAlign="center">
                                   Up to 3 years on-site warranty available for your peace of mind.
                              </Typography>
                         </Box>

                         <Box className={classes.subBox}>
                              <Avatar sx={{ bgcolor: "blue", height: "4.063rem", width: "4.063rem" }}>
                                   <AccountCircleRoundedIcon sx={{ fontSize: "2.5rem" }} />
                              </Avatar>
                              <Typography variant="h3" textAlign="center">
                                   {" "}
                                   Personal Account{" "}
                              </Typography>
                              <Typography variant="h5" textAlign="center">
                                   With big discounts, free delivery and a dedicated support specialist.
                              </Typography>
                         </Box>

                         <Box className={classes.subBox}>
                              <Avatar sx={{ bgcolor: "blue", height: "4.063rem", width: "4.063rem" }}>
                                   <SavingsRoundedIcon sx={{ fontSize: "2.5rem" }} />
                              </Avatar>
                              <Typography variant="h3" textAlign="center">
                                   {" "}
                                   Amazing Savings{" "}
                              </Typography>
                              <Typography variant="h5" textAlign="center">
                                   Up to 70% off new Products, you can be sure of the best price.
                              </Typography>
                         </Box>
                    </Container>
               </Box>
          </>
     );
};

export default FooterTop;
