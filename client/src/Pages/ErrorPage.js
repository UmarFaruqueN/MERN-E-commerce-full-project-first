import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import error from "../asset/error.jpg";

const ErrorPage = () => {
     const navigate = useNavigate();
     useEffect(() => {
          setTimeout(() => {
               navigate("/");
          }, 4000);
     }, [navigate]);
     return (
          <>
               <Box>
                    <img width={"100%"} height={"100%"} src={error} alt="imggggg" />
               </Box>
          </>
     );
};

export default ErrorPage;
