import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AddOffer from "./Components/AddOffer";
import CouponView from "./Components/CouponView";

const Offers = () => {
     return (
          <>
               <Box>
                    <Container>
                         <AddOffer />
                         <CouponView/>
                    </Container>
               </Box>
          </>
     );
};

export default Offers;
