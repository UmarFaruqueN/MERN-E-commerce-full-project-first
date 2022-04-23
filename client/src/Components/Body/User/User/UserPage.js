import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import LeftBox from "../Components/LeftBox";
import Title from "../Components/Title";
import UserDetails from "./components/UserDetails";
import { useDispatch } from "react-redux";
import axios from "axios";

import { getAddress, getUser } from "../../../../utlis/Constants";
import { setAddress, setUserData } from "../../../../Redux";

const UserPage = () => {
     const dispatch = useDispatch();
     const user = localStorage.getItem("user");
     const [up, setUp] = useState(0);
     useEffect(() => {
          axios.post(getUser, { user: user }, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setUserData({ userData: response.data.userData }));
               })
               .catch((err) => {
                    console.log(err);
                    console.log(err?.response?.data?.message);
               });
          axios.post(getAddress, { user: user }, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setAddress({ address: response.data.allAddress }));
               })
               .catch((err) => {
                    console.log(err);
                    console.log(err?.response?.data?.message);
               });
     }, [up, dispatch, user]);
     return (
          <>
               <Box pt={13}>
                    <Container>
                         <Title />

                         <Grid container spacing={4} pt={5}>
                              <LeftBox account={true} />
                              <UserDetails setUp={setUp} />
                         </Grid>
                    </Container>
               </Box>
          </>
     );
};

export default UserPage;
