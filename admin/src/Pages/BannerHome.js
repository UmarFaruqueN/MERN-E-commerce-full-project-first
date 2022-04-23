import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BannerManagement, Layout } from "../Components";

const BannerHome = () => {
     const navigate = useNavigate();
     useEffect(() => {
          const Token = localStorage.getItem("token");
          if (!Token) {
               navigate("/");
          }
     }, [navigate]);
     return (
          <Layout>
               <BannerManagement />
          </Layout>
     );
};

export default BannerHome;
