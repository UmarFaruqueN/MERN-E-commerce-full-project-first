import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import Banner from "../Banner/Banner";



const Poster = () => {
    
    return (
        <>
          <Banner/>
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    height: "60px",
                    width: "100%",
                    backgroundColor: "secondary.light",
                    marginTop: "60px",
                    borderRadius: "20px",
                }}
            >
                <Box sx={{ flexGrow: 4 }} />
                <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                    <DashboardCustomizeIcon sx={{ fontSize: "1.9rem", color: "text.hint", pr: 1 }} />
                    <Typography variant="h2" fontWeight="700" noWrap color="text.hint" component="div">
                        ZETETIKOZ
                    </Typography>
                    <Typography marginLeft="6px" variant="h2" fontWeight="600" fontSize="1.8rem" color="#00AEB8">
                        |
                    </Typography>
                </Box>
                <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                    <Typography color="#272560" variant="h3" fontWeight="500">
                        <b>own</b> it now, up to 6 months extended warranty for all products
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 4 }} />
            </Box>
        </>
    );
};

export default Poster;
