import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Categories, Layout } from "../Components";

const CategoryHome = () => {
     const navigate = useNavigate();
     useEffect(() => {
          const Token = localStorage.getItem("token");
          if (!Token) {
               navigate("/");
          }
     }, [navigate]);
     return (
          <Layout>
               <Categories />
          </Layout>
     );
};

export default CategoryHome;
