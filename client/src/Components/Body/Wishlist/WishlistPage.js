import { Box, Container } from "@mui/material";
import React from "react";

import WishlistTable from "./components/WishlistTable";

const WishlistPage = () => {
     return (
          <Box pt={13}>
            <Container>
               <WishlistTable />
               </Container>
          </Box>
     );
};

export default WishlistPage;
