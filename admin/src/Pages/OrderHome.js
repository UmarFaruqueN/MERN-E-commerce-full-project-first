import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Layout, OrderManagement } from "../Components";

const OrderHome = () => {
     const navigate = useNavigate();
     useEffect(() => {
          const Token = localStorage.getItem("token");
          if (!Token) {
               navigate("/");
          }
     }, [navigate]);
     return (
          <Layout>
               <OrderManagement />
          </Layout>
     );
};

export default OrderHome;
