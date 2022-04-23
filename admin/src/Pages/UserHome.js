import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserManagement, Layout } from "../Components";

const UserHome = () => {
     const navigate = useNavigate();
     useEffect(() => {
          const Token = localStorage.getItem("token");
          if (!Token) {
               navigate("/");
          }
     }, [navigate]);
     return (
          <Layout>
               <UserManagement />
          </Layout>
     );
};

export default UserHome;
