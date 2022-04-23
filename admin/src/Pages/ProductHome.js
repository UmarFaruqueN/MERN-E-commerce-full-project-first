import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Layout, ProductManagement } from "../Components";

const ProductHome = () => {
     const navigate = useNavigate();
     useEffect(() => {
          const Token = localStorage.getItem("token");
          if (!Token) {
               navigate("/");
          }
     }, [navigate]);
     return (
          <Layout>
               <ProductManagement />
          </Layout>
     );
};

export default ProductHome;
